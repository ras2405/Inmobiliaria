import { CustomError } from "./CustomError";

export class NotFoundError extends CustomError {
    constructor() {
        super('Resource not found', 404);
    }
}
