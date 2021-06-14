
const express = require('express')
const router = new express.Router()
const auth = require('../auth/authHandler')
const User = require('./usersModel')
const UserRequest = require('./userRequest')

router.post("/users", async (req, res) => {
    const user = Object.assign(new UserRequest(), req.body)
    console.log('user', user)
    try {
        //await user.save()
        res.status(201).send();
    } catch(e) {
        res.status(400).send(e);
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

router.get("/users/:id", auth, async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).send( {error: "User not found"} );
        }
        return res.status(200).send(req.user.toJSON())
    }catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try{
        await req.user.remove()
        res.status(204).send()
    }catch (e) {
        res.status(500).send({error: e.message})
    }
})

module.exports = router