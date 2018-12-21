import * as Koa from 'koa';
import { Logger, Layout } from 'log4js';
import * as KoaRouter from 'koa-router';

declare module Owl {

	export class BaseContextClass {
    /**
     * request context
     */
    ctx: Context;

    /**
     * Application
     */
    app: OwlApplcation;

    /**
     * service
     */
    service: Service;

    /**
     * model
     */
    model: Model;

    constructor(ctx: Koa.Context);
  }

  export class Controller extends BaseContextClass {}

  export class Service extends BaseContextClass { }

  export class Model extends BaseContextClass {
    /**
     * 
     * @param key name
     * @param cb callback
     */
    static caches(key: string, cb: Function): Object;
  }

  /**
   * logconfig
   */
  export interface ILogConfig {
    logFilePath: string;
    layout?: Layout;
    pattern?: string;
    pm2?: boolean;
    filterHeaders?: Array<string>;
  }
  /**
   * fetch config
   */
  export interface IFetchConfig {
    url: string;
    method?: string;
    data?: any;
    headers?: any;
  }

  export interface IContext extends Koa.Context {
    readonly clientIP: string;
    readonly serverIp: string;
    readonly requestId: string;
    json(data: Object);
    fetch(config: IFetchConfig): Promise;
  }
  /**
   * owlconfig
   */
  export interface IOwlConfig {
    pkg: string,
    rootPath: string;
    viewRoot: string,
    PORT: number,
    logConfig: ILogConfig,
  }

  export class OwlApplcation extends Koa {
    constructor(config: IOwlConfig);

    readonly logger: Logger;

    bootstrap(cb?:Function);

    router: KoaRouter;
  }
}


export = Owl;