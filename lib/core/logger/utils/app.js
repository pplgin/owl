module.exports = function (context, info, level, message, category) {
  const req = context.request

  return JSON.stringify({
    s_name: context.hostname,
    level: level || 'info',
    message: message || '',
    method: req.method || '',
    host: req.headers.host,
    path: context.path,
    query_string: JSON.stringify(context.query),
    user_id: context.state.user ? context.state.user.user_id : 0,
    proj: info.project || '',
    s_ip: context.serverIp,
    category: category || '',
    log_time: Date.now(),
    request_id: context.requestId
  })
}
