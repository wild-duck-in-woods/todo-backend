const express = require("express")

const router = express.Router()

const Task = require("../models/Task")

const verifyToken = require("../middleware/verifyToken")
const {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController")


router.get("/tasks",
    verifyToken,
    getTasks
)

router.post("/tasks",
    verifyToken,
    createTask
)

router.put("/tasks/:id",
    verifyToken,
    updateTask
)

//delete
router.delete("/tasks/:id",
    verifyToken,
    deleteTask
)

router.get("/test", (req, res) => {
    res.send("working")
})
module.exports = router
