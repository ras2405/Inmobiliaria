import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { BadRequestError } from '../exceptions/BadRequestError';

let SharpMulter: any;

try {
    SharpMulter = require('sharp-multer');
} catch (e) {
    console.error('Failed to import sharp-multer:', e);
}

const IMAGE_SIZE = 500 * 1024; // 500KB
const uploadPath = path.resolve(__dirname, '../../uploads');

const createUploadsFolder = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

createUploadsFolder(uploadPath);

const storage =
    SharpMulter({
        destination: (
            req: Request,
            file: Express.Multer.File,
            callback: (error: Error | null, destination: string) => void
        ) => {
            callback(null, uploadPath);
        },
        filename: () => {
            const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return `${uniqueName}.jpg`;
        },
        imageOptions: {
            fileFormat: "jpg",
            quality: 80,
            resize: { width: 500, height: 500 },
        },
    });

export const upload = multer({
    storage,
    limits: { fileSize: IMAGE_SIZE },
    fileFilter: async (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new BadRequestError('Only image files are allowed.'));
        }
        cb(null, true);
    }
});
