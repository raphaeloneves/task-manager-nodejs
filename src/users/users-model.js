const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../tasks/taskModel')

const MY_KEY = 'node_playground_key'

const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        validate(value) {
            if (value.toLowerCase() === "password") {
                throw new Error("Passoword value cannot be equal to password");
            }
            if (value.length < 6) {
                throw new Error("Password must have at least 6 characteres");
            }
        },
    },
    age: {
        type: mongoose.Schema.Types.Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be positive");
            }
        },
    },
    tokens: [{
        token: {
            type: mongoose.Schema.Types.String,
            required: true
        }
    }]
}, {
    timestamps: true
})


// hooks

userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

// relations

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

// class methods

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne( {email} );
    if(!user) {
        throw new Error("User cannot login")
    }

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) {
        throw new Error("User cannot login")
    }

    return user;
}

// instance methods

userSchema.methods.generateToken = async function() {
    const user = this
    const token = jwt.sign({_id: user._id}, MY_KEY, {expiresIn: '1 day'});
    user.tokens = user.tokens.concat({token});
    await user.save()
    return token;
}

userSchema.methods.toJSON = function() {
    const obj = this.toObject()
    delete obj.password
    delete obj.tokens
    return obj
}

const User = mongoose.model("User", userSchema)
module.exports = User