const express = require('express');
const router = express.Router();
const User = require('../models').User
require('dotenv').config()
const bcrypt = require('bcrypt')

const taskRouter = require('./task')

const checkJwt = require('../middleware')

router.get('/', checkJwt, async (req, res) => {
    try {
        const userId = Number(req.user.id);
        const foundUser = await User.findOne({
            where:{
                id: userId
            }
        })
        return res.status(200).json({
            user: foundUser
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Error while getting user'
        })
    }
})

router.use('/task', taskRouter)

module.exports = router