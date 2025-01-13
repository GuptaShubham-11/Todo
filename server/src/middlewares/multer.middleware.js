import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/public/temp');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        console.log("Multer In File: ", file);
    }
})

const upload = multer({ storage: storage });