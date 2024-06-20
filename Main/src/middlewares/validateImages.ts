import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../exceptions/BadRequestError';
import { deleteFiles } from '../utils/imageHelpers';

export const validateImages = (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length < 4) {
        deleteFiles(files);
        return next(new BadRequestError('At least 4 photos are required.'));
    }

    next();
};
