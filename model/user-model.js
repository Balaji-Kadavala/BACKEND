const mongoose = require("mongoose")
var UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    gmail: String
})
var UserModel = mongoose.model("Users", UserSchema);

module.exports=UserModel;