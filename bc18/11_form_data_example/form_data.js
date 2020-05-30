const express = require('express');
const multer = require('multer');
const path = require('path');
const Jimp = require('jimp');
const { promises: fsPromises} = require('fs');
const PORT = 3000;

const app = express();
const storage = multer.diskStorage({
    destination: 'drafts',
    filename: (req, file, cb) => {
        if (!file.mimetype.includes('image')) {
            const err = new Error();
            err.status = 400;
            return cb(err);
        }

        const originName = file.originalname;
        const { ext } = path.parse(originName);
        cb(null, `${Date.now()}${ext}`)
    }
});
const upload = multer({ storage });

app.post('/sign-up', upload.single('avatar'), compressImage, (req, res, next) => {
    console.log('req.file', req.file);
    console.log('req.body', req.body);

    res.send();
});

app.listen(PORT, () => {
    console.log('Server started listening on port', PORT);
});

async function compressImage(req, res, next) {
    try {
        const { path: filePath, filename } = req.file;
        const COMPRESSED_IMAGES_DIST = 'uploads';
        const compressedFilePath = path.join(COMPRESSED_IMAGES_DIST, filename);

        const lenna = await Jimp.read(filePath);
        await lenna
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(compressedFilePath); // save

        req.file = {
            ...req.file,
            destination: COMPRESSED_IMAGES_DIST,
            path: compressedFilePath,
        }

        await fsPromises.unlink(filePath);

        next();
    } catch(err) {
        next(err);
    }
}

