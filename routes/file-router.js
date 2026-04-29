const router = require("express").Router();
const path = require("path")
const multer  = require('multer');
const FileModel = require("../model/file-model");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../uploads'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
    console.log("file::",file)
  }
})
const upload = multer({ storage })

router.post("/upload",upload.single('profile'),(req,res)=>{
    const newFileUpload = new FileModel({
        imageUrl : req.file.path,
        fileName : req.file.filename
    })
    newFileUpload.save();
    console.log(req.file)
    res.send({msg:"Image uploaded!"})
})

router.get("/allFiles",(req,res)=>{
    const allFiles = FileModel.find().then((data)=>res.send(data))
})

module.exports = router;