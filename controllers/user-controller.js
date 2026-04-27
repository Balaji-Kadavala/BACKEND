const UserModel = require("../model/user-model");

const addNewUser = (req, res)=>{
    var newUser = new UserModel({ ...req.body })
    newUser.save();
    res.send("User added into the DB!")
}

const getAllUsers = (req,res)=>{
    UserModel.find()
    .then((data)=>{
        res.send(data);
    })
}

module.exports = { addNewUser, getAllUsers }