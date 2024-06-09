import fs from 'fs';

export const deleteFiles = (files: Express.Multer.File[]) => {
    files.forEach(file => {
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error(`Failed to delete file ${file.path}:`, err);
            }
        });
    });
};
