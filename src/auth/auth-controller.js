const express = require('express')
const router = new express.Router()
const auth = require('./auth-middleware')
const User = require('../users/users-model')

router.post("/auth/login", async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateToken();
        res.send({user, token})
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post("/auth/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token)
        await req.user.save()
        res.status(204).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post("/auth/logout/all", auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(204).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router