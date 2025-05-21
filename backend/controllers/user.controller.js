import { Users } from "../models/user.model.js"
import { todos } from "../models/todo.model.js"
import {DueTimeMail} from "../mail/DueTimeMail.js"

const profile = async(req,res,next) =>{
    const {data} = req.user
    const user = await Users.findById(data)
    res.status(201).json(user)
}

const newTodos = async(req,res,next) => {
    try{
        const {title, description, dueTime} = req.body
        console.log(typeof dueTime, dueTime)
        if(!title || !description){
            const err = new Error("Title and description is required")
            throw err
        }
        const {data} = req.user
        const todo = await todos.create({
            title,
            description,
            createdTime : Date.now(),
            dueTime : new Date(dueTime),
            user : data
        })
        await Users.findByIdAndUpdate(data,{$push : {todos : todo._id}})
        res.json(todo, {message: "created"})
    }
    catch(err){
        next(err)
    }
}

const allTodos = async(req,res,next) => {
    try{
        const {data} = req.user
        const user = await Users.findById(data).populate({
            path : "todos",
        })
        res.json(user.todos)    
    }
    catch(err){
        next(err)
    }
}

const doneTodos = async(req,res,next) => {
    try{
        const {data} = req.user
        const user = await Users.findById(data).populate({
            path : "todos",
        })
        const doneTodos = user.todos.filter((val)=>{
            if(val.status == true){
                return val
            }
        })
        res.json(doneTodos)
    }
    catch(err){
        next(err)
    }
}

const undoneTodos = async(req,res,next) => {
     try{
        const {data} = req.user
        const user = await Users.findById(data).populate({
            path : "todos",
        })
        const doneTodos = user.todos.filter((val)=>{
            if(val.status != true){
                return val
            }
        })
        res.json(doneTodos)
    }
    catch(err){
        next(err)
    }
}

const updateTodo = async(req,res,next) => {
    try{
        const {data} = req.user
        const user = await Users.findById(data).populate({
            path : "todos",
            select : "_id title user"
        })
        const todo = await todos.findById(req.params.id)
        await todos.findByIdAndUpdate(req.params.id, {status : !todo.status})
        res.json({message : `Status is changed to ${!todo.status}`})    
    }
    catch(err){

    }
}

const removeTodo = async(req,res,next) => {
    try{
        const {data} = req.user
        const user = await Users.findById(data)
        for(let i in user.todos){
            if(user.todos[i] == `${req.params.id}`){
                await todos.findByIdAndDelete(user.todos[i])
                var removedtodo = user.todos.splice(i, 1)
                console.log(removedtodo)
                break
            }
        }
        await Users.findByIdAndUpdate(data, user)
        res.json(user)

    }
    catch(err){

    }
}

const updateTime = async(req,res,next) => {
    try{
        const {todo_id} = req.params.id
        const {newDate} = req.body
        const todo = await todos.findByIdAndUpdate(todo_id, {dueTime : new Date(newDate)})
        res.json(todo)
    }
    catch(err){
        next(err)
    }
}

const NoOfTodosDone = async(req,res,next) =>{
    try{
        const {data} = req.user
        const user = await Users.findById(data)
        res.json({
            "number of todos" : user.todos.length 
        })
    }
    catch(err){
        next(err)
    }
}

const removeAllTodos = async(req,res,next) =>{
    try{
        const {data} = req.user
        const user = await Users.findById(data)
        console.log(user.todos)
        await Users.findByIdAndUpdate(data, {todos : []})
        await todos.deleteMany({user : data})
        res.json({
            message : "Removed all todos"
        })
    }
    catch(err){
        next(err)
    }
}

export {profile,allTodos,removeAllTodos, doneTodos, undoneTodos, newTodos, updateTodo, removeTodo, updateTime, NoOfTodosDone}
