import { CustomError } from "./CustomError";

export class ServiceError extends CustomError {
    constructor(message: string = 'Service Unavailable') {
        super(message, 503);
    }
}
