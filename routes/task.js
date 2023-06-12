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

router.delete('/single/:id', checkJwt, checkOwnership, async (req, res) => {
    try {
        const task = req.task
        await Task.destroy({
            where:{
                id: task.id
            }
        })
        return res.sendStatus(200)
    } catch (error) {
        return res.status(400).json({
            message: "Error while deleting task"
        })
    }
})

router.patch('/single/:id', checkJwt, checkOwnership, async (req, res) => {
    try {
        const task = req.task
        const {name, status} = req.body
        const updatedTask = await Task.update({
            name: name,
            status: status
        }, {
            where: {
                id: task.id
            }
        })
        return res.sendStatus(200)
    } catch (error) {
        return res.status(400).json({
            message: "Error while updating task"
        })
    }
})

router.patch('/single/:id/:mode', checkJwt, checkOwnership, async (req, res) => {
    try {
        const task = req.task;
        const mode = Number(req.params.mode)
        let status = ''
        if(mode === 1){
            status = 'Waiting'
        }else if(mode === 2){
            status = 'Started'
        }else if(mode === 3){
            status = 'Finished'
        }
        const updatedTask = await Task.update({
            status:status
        }, {
            where: {
                id:task.id
            }
        })
        return res.sendStatus(200)

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Error while changing the mode of the task"
        })
    }
})

module.exports = router