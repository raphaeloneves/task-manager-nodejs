const express = require('express')
const router = new express.Router()
const auth = require('../auth/auth-middleware')

const Task = require('./taskModel')

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });
    try{
        await task.save()
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.get("/tasks", auth, async (req, res) => {
    try {
        await req.user.populate('tasks').execPopulate()
        res.status(200).send(req.user.tasks);
    } catch (e) {
        res.status(500).send(e)
    }
})

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGMzNWYxYzhlOTViODNiZTA4ZmE4YjMiLCJpYXQiOjE2MjM0MjE5MDksImV4cCI6MTYyMzUwODMwOX0.rS2BkMFdLpzuhlq3ouWF9ZJOoidX6FEDsvUEEYn-7Z8

router.get("/tasks/:id", auth, async (req, res) => {
    const id = req.params.id;
    try{
        const task = await Task.findOne({_id: id, owner: req.user._id});
        if(!task) {
            return res.status(404).send( {error: "Task not found"} );
        }
        return res.status(200).send(task)
    }catch (e){
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete("/tasks/:id", auth, async (req, res) => {
    if(!req.params.id) {
        return res.status(400).send({ error: "Must provide the task ID"} )
    }
    const id = req.params.id;

    try{
        const task = await Task.findOne({_id: id, owner: req.user._id});
        if(!task) {
            return res.status(404).send({error: "Task not found"})
        }
        await task.remove()
        res.status(204).send()
    }catch (e){
        res.status(500).send({error: e.message})
    }
})

router.patch("/tasks/:id", auth, async (req, res) => {
    if(!req.params.id) {
        return res.status(400).send({ error: "Must provide the task ID"} )
    }
    const requestAttributes = Object.keys(req.body)
    const permittedAttributes = ['description', 'completed', 'owner']
    const isValidOperation = requestAttributes.every((field) => permittedAttributes.includes(field))

    if(!isValidOperation) {
        return res.status(400).send({error: "Invalid fields to update."})
    }
    const id = req.params.id

    try {
        const task = await Task.findOne({_id: id, owner: req.user._id})
        if(!task) {
            return res.status(404).send({error: "Task not found"})
        }

        requestAttributes.forEach((attr) => task[attr] = req.body[attr]);
        await task.save();

        res.send(task);
    } catch (e) {
        res.send({ error: e.message })
    }
})

module.exports = router