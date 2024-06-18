import { ZodError } from "zod";
import { CustomError } from "./CustomError";
export class ValidationError extends CustomError {
    constructor(zodError: ZodError) {
        const details = zodError.errors.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message
        }));
        super('Invalid data', 400, details);
    }
}
