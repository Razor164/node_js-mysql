import * as jwt from 'jsonwebtoken';
import * as fs from 'file-system';
import * as moment from 'moment';
import * as path from 'path';
import { ErrorHandler } from './error-handler.service';
import { API_ERROR } from '../models/constants/errors';

export class APIAuthService {
    static getToken(): Promise<string> {
        const data = {
            iat: moment.utc().add(60 * 48, 'minutes').unix(),
        };
        const privateKey = fs.readFileSync(path.join(__dirname, 'keys/key.pem'), 'utf8');
        return jwt.sign(data, privateKey, {
            algorithm: 'RS256',
        });
    }

    static validateToken(req, res, next): void {
        const authHeader = req.headers.authorization;
        if (!authHeader) return ErrorHandler.handle(API_ERROR.NOT_AUTHORIZED, res);
        const token = authHeader.slice(7);
        if (!token) return ErrorHandler.handle(API_ERROR.NOT_AUTHORIZED, res);
        const publicKey = fs.readFileSync(path.join(__dirname, 'keys/key.pub'), 'utf8');
        jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
        }, (err, decoded) => {
            if (err) return ErrorHandler.handle(API_ERROR.NOT_AUTHORIZED, res);
            next();
        });
    }
}