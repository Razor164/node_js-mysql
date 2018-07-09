import * as express from 'express';
import { APILogger } from './logger.service';
import { ErrorHandler } from './error-handler.service';
import { MYSQL } from './mysql.service';
// import { MONGO } fro./mysql.serviceice';

export class RestController {
    private _router = express.Router();
    private middleware: Function[];
    public logger;
    public db;
    public baseUrl;
    constructor(baseUrl: string, middleware: Function[] = []) {
        this.logger = APILogger.getLogger(baseUrl);
        this.db = MYSQL;
        this.middleware = middleware;
        this.baseUrl = baseUrl;
    }

    get<T>(path: string, cb: (this: RestController, req, res) => Promise<T>, sendResponse: boolean = true): void {
        this._router.get(path, this.middleware, async (req, res) => {
            try {
                const r: T = await cb.call(this, req, res);
                if (sendResponse) res.send(r);
            } catch (e) {
                ErrorHandler.handle(e, res);
            }
        });
    }

    post<T>(path: string, cb: (this: RestController, req, res) => Promise<T>, sendResponse: boolean = true): void {
        this._router.post(path, this.middleware, async (req, res) => {
            try {
                const r: T = await cb.call(this, req, res);
                if (sendResponse) res.send(r);
            } catch (e) {
                ErrorHandler.handle(e, res);
            }
        });
    }

    put<T>(path: string, cb: (this: RestController, req, res) => Promise<T>, sendResponse: boolean = true): void {
        this._router.put(path, this.middleware, async (req, res) => {
            try {
                const r: T = await cb.call(this, req, res);
                if (sendResponse) res.send(r);
            } catch (e) {
                ErrorHandler.handle(e, res);
            }
        });
    }

    delete<T>(path: string, cb: (this: RestController, req, res) => Promise<T>, sendResponse: boolean = true): void {
        this._router.delete(path, this.middleware, async (req, res) => {
            try {
                const r: T = await cb.call(this, req, res);
                if (sendResponse) res.send(r);
            } catch (e) {
                ErrorHandler.handle(e, res);
            }
        });
    }

    get instance(): any {
        return this._router;
    }
}