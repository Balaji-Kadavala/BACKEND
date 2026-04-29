const mongoose = require("mongoose")
const FileSchema = mongoose.Schema({
    imageUrl : String,
    fileName : String,
    timeStamp : {
        type : Date,
        default : Date.now()
    }
})
const FileModel = mongoose.model("FileUploading", FileSchema)

module.exports=FileModel;