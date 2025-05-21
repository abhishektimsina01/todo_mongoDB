import express from "express"
import {profile,allTodos, doneTodos, undoneTodos,removeAllTodos, newTodos, updateTodo, removeTodo, updateTime, NoOfTodosDone} from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/verifyToken.js"
const userRouter = express.Router()

userRouter.get("/profile", verifyToken, profile)
userRouter.get("/allTodos",verifyToken, allTodos)
userRouter.get("/doneTodos",verifyToken, doneTodos)
userRouter.get("/undoneTodos",verifyToken, undoneTodos)
userRouter.post("/newTodos",verifyToken, newTodos)
userRouter.put("/updateTodo/:id",verifyToken, updateTodo)
userRouter.get("/removeTodo/:id",verifyToken, removeTodo)
userRouter.put("/updateTime",verifyToken, updateTime)
userRouter.get("/NoOfTodosDone",verifyToken, NoOfTodosDone)
userRouter.get("/removeAllTodos",verifyToken, removeAllTodos)
export default userRouter