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

router.get('/single/:id', checkJwt, checkOwnership,async (req, res) => {
    try {
        const task = req.task
        return res.status(200).json(task)
    } catch (error) {
        return res.status(400).json({
            message: "Error while trying to get task"
        })
    }
})

router.get('/allTasks', checkJwt, async (req, res) => {
    try {
        const userId = Number(req.user.id);
        console.log(userId)
        const foundTasks = await Task.findAll({
            where: {
                userId: userId
            }
        });
        return res.status(200).json(foundTasks)
    } catch (error) {
        return res.status(400).json({
            message: "Error while fetching all tasks"
        })
    }
})

module.exports = router