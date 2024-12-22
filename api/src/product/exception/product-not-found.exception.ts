import { ExceptionCode } from '../types/product.type';

export class ApplicationError extends Error {
    code: ExceptionCode;

    constructor(message: string, code: ExceptionCode) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
