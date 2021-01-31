const path = require('path');
var multer = require('multer')
exports.upload = multer({
    dest: 'uploads/',
    limits: { fileSize: '10000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /csv|xlsx|xlx|png|gif/;
        const mimetype = excelMimeTypes.find(type => type == file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: Invalid file type");
    }
})

let excelMimeTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.oasis.opendocument.spreadsheet",
    "application/vnd.ms-excel",
    "application/octet-stream",
    "application/zip"
];