export class ApplicationError<ExceptionCode> extends Error {
    code: ExceptionCode;

    constructor(message: string, code: ExceptionCode) {
        super(message);
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
