import { CustomError } from "./CustomError";

export class InternalServerError extends CustomError {
    constructor(message: string = 'Something went wrong') {
        super(message, 500);
    }
}
