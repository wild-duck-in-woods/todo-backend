require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const app = express()

const connectDB= require("./config/db")
const verifyToken= require("./middleware/verifyToken")
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(authRoutes)
app.use(taskRoutes)

const User = require("./models/User")
const Task = require("./models/Task")

connectDB()

app.listen(PORT, () => {
    console.log("Server running on port 5000")
})
