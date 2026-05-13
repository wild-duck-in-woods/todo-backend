const Task = require("../models/Task")

const getTasks = async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.user.userId
        })

        res.json(tasks)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
}

const createTask= async (req, res) => {

    try {

        const newTask = await Task.create({
            text: req.body.text,
            completed: false,
            userId: req.user.userId
        })

        res.json(newTask)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
}

const updateTask= async (req, res) => {

    try {

        const task = await Task.find({
            _id: req.params.id
        });


        if (!task.length) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        if (task[0].userId.toString() !== req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,

            {
                ...req.body
            },

            // {
            //     new: true
            // }
        )

        res.json(updatedTask)

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
}

const deleteTask= async (req, res) => {

    try {

        const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }

        if (task.userId.toString() !== req.user.userId) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        await Task.findByIdAndDelete(req.params.id)

        res.json({
            message: "Task deleted"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
}