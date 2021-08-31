const { text } = require('express');
const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf' : 'pdf',
  'text/css' : 'css',
  "application/msword": 'doc' ,
  'text/html': 'html',
  'text/csv': "csv",
  'application/gzip': 'gz',
  'text/javascript': 'js',
  '	application/vnd.ms-powerpoint': "ppt",
  'application/rtf': 'rtf',
  'text/plain': "txt",
  'application/zip': "zip",
  'application/x-7z-compressed': "7z"

}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) {
      error = null;
    }
    cb(error, "files");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


module.exports = multer({storage: storage }).single("FileUpload");