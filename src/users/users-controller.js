
const express = require('express')
const router = new express.Router()
const auth = require('../auth/auth-middleware')
const User = require('./users-model')
const UserRequestDto = require('./dtos/user-request-dto')
const userService = require('./users-service')

router.post("/users", async (req, res, next) => {
    const userDto = Object.assign(new UserRequestDto(), req.body)
    try {
        const createdUser = await userService.save(userDto)
        //res.status(201).send(createdUser);
        throw new Error()
    } catch(e) {
        next(e)
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.send(req.user)
})

router.get("/users/:id", auth, async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await userService.findById(id)
        return res.status(200).send(user)
    }catch(e) {
        next(e)
    }
})

router.delete('/users/me', auth, async (req, res, next) => {
    try{
        await req.user.remove()
        res.status(204).send()
    }catch (e) {
        next(e)
    }
})

module.exports = router