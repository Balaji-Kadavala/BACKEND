const router = require("express").Router();
const path = require("path")
const multer  = require('multer');
const FileModel = require("../model/file-model");
const { uploadFile, getAllFilesData } = require("../controllers/file-controller");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
    console.log("file::",file)
  }
})
const upload = multer({ storage })

router.post("/upload",upload.single('profile'),uploadFile)

router.get("/allFiles",getAllFilesData)

module.exports = router;