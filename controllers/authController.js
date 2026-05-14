const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const signupUser = async (req, res) => {

    const { username, email, password } = req.body

    try {

        const existingUser =
            await User.findOne({ email })

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword =
            await bcrypt.hash(password, 10)

        await User.create({
            username,
            email,
            password: hashedPassword
        })

        res.json({
            message: "User created successfully"
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
}
const loginUser = async (req, res) => {

    const { email, password } = req.body
    

    try {

        const user = await User.findOne({
            email
        })

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            })
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            )

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }
        )

        res.json({
            token,

            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

    } catch (err) {

        console.log(err)

        res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports={
    signupUser,
    loginUser,
}