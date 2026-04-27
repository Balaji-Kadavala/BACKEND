const TodoModel = require("../model/todo-model");

function getAllTodos(req,res){
    TodoModel.find()
    .then((data)=>{
        res.send(data);
    })
}

const delTodoById = (req,res)=>{
    TodoModel.findByIdAndDelete(req.params.id)
    .then((status)=>{
        res.send(status)
    })
}

const addNewTodo = function(req, res){
    var newTodo = new TodoModel({ title:req.body.title, status:false, timeStamp: new Date() })
    newTodo.save();
    res.redirect("/todoform.html")
}

module.exports = { getAllTodos, delTodoById, addNewTodo }