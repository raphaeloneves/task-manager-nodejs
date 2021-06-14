const express = require("express");
const app = express();

require("./configs/database")

const errorHandler = require('./errors/config/error-handler')
const errorLogger = require('./errors/config/error-logger')

const userRouter = require('./users/users-controller')
const taskRouter = require('./tasks/tasksController')
const authRouter = require('./auth/auth-controller')

const PORT = process.env.PORT || 3000

app.use(express.json());

// controllers

app.use(userRouter)
app.use(taskRouter)
app.use(authRouter)

app.use(errorLogger)
app.use(errorHandler)

// app setup

app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
