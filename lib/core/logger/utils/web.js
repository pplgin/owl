
function maskString (str) {
  const length = str.length
  const maskLen = Math.floor(length / 2)
  let mask = '*'
  mask = mask.repeat(maskLen)
  return mask + str.substring(maskLen)
}

function removeUnSafeData (headers, unsafeKeys = []) {
  for (let c of unsafeKeys) {
    if (headers[c]) {
      headers[c] = maskString(headers[c])
    }
  }

  if (headers.cookie && unsafeKeys.length) {
    const arr = headers.cookie.split(';')
    headers.cookie = arr.map(s => {
      const cookieArray = s.split('=')
      if (unsafeKeys.includes(cookieArray[0].trim())) {
        cookieArray[1] = maskString(cookieArray[1].trim())
        return cookieArray.join('=')
      }
      return s
    }).join(';')
  }
  return headers
}

module.exports = function (context, info) {
  const resLength = context.get('content-length') * 1
  const reqLength = context.get('content-length') * 1
  info = info || {}
  const reqHeaders = Object.assign({}, context.headers)
  removeUnSafeData(reqHeaders, info.filterHeaders)
  let user_id = context.state.user ? context.state.user.user_id : 0
  return JSON.stringify({
    s_name: context.serverHostName,
    log_time: Date.now(),
    proj: info.project || 'node',
    s_ip: context.serverIp,
    s_headers: JSON.stringify(context.response.headers),
    c_headers: JSON.stringify(reqHeaders),
    method: context.request.method,
    host: context.headers.host,
    path: context.url,
    query_string: JSON.stringify(context.query),
    c_ip: context.clientIp,
    user_id,
    useragent: context.headers['user-agent'],
    referer: context.headers.referrer || context.headers.referer || '',
    status: context.status,
    c_bytes: reqLength,
    s_bytes: resLength,
    time_taken: info.responseTime || 0,
    request_id: context.requestId
  })
}
