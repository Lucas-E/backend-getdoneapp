const express = require('express')
const router = express.Router()
const Task = require('../models').Task
const checkJwt = require('../middleware/checkJwt')
const checkOwnership = require('../middleware/checkTaskOwnership')

router.post('/', checkJwt, async (req, res) => {
    try {
        const {name} = req.body
        const userId = Number(req.user.id)
        const createdTask = await Task.create({
            name:name,
            userId:userId
        });
        return res.status(200).json({
            message: "Task created"
        })
    } catch (error) {
        return res.status(400).json({
            message: "Error while creating task"
        })
    }
})

router.get('/:id', checkJwt, checkOwnership,async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(400).json({
            message: "Error while trying to get task"
        })
    }
})

module.exports = router