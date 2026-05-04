const FileModel = require("../model/file-model");

const uploadFile=(req,res)=>{
    const newFileUpload = new FileModel({
        imageUrl : req.file.path,
        fileName : req.file.filename
    })
    newFileUpload.save();
    console.log(req.file)
    res.send({msg:"Image uploaded!"})
}

const getAllFilesData=(req,res)=>{
    const allFiles = FileModel.find().then((data)=>res.send(data))
}

module.exports={uploadFile, getAllFilesData}