const Task = require('../models').Task
const User = require('../models').User

const checkOwnership = async (req, res, next) => {
    try {
        const taskId = Number(req.params.id)
        const foundTask = await Task.findOne({
            where: {
                id: taskId
            }
        })
        if(!foundTask){
            return res.status(400).json({
                message: "Task not found"
            })
        }
        if(foundTask.userId === req.user.id){
            next()
        }else{
            return res.status(401).json({
                message: "This task does not belongs to you"
            })
        }
    } catch (error) {
        return res.status(400).json({
            message: "Error while getting the task"
        })
    }
}