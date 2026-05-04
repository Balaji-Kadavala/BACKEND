const mongoose = require("mongoose")
const connectDB=()=>{
    mongoose.connect("mongodb+srv://balaji:18062007@balaji.qynoegx.mongodb.net/thoughtworks?appName=balaji")     //process.env.MONGO_URI Use this there is URI in .env file
        .then(() => {
            console.log("DB Connected!")
        })
        .catch((err) => {
            console.log("DB Error:", err)
        })
}
module.exports=connectDB;