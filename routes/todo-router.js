const router = require("express").Router();
const { getAllTodos, delTodoById, addNewTodo } = require("../controllers/todo-controller");
const TodoModel = require("../model/todo-model");

router.post("/submit",addNewTodo)

router.get("/",getAllTodos)

router.get("/delete-todo/:id",delTodoById)

module.exports = router;