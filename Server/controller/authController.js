import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import multer from "multer"
import path from "path"
import axios from "axios"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const registerUser = async (req, res) => {
    try {
        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ success: false, error: "user is already registered" })
        }
        //hash password
        const hashPassword = await bcrypt.hash(password, 10)

        let profileImage = null
        if (req.file) {
            profileImage = `/uploads/${req.file.filename}`
        }

        //save user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            profilePhoto: profileImage
        })

        await newUser.save()
        res.status(200).json({ success: true, message: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ success: false, message: "User not exists!" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ success: false, error: "Wrong Credentials" })
        }

        //Generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: "1d" })
        return res.status(200).json({ success: true, message: "Login successful", token, user: { _id: user._id, name: user.name, email: user.email } })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const verify = (req, res) => {
    res.status(200).json({ success: true, token, user: req.user })
}

export { loginUser, verify, registerUser, upload }

// Login controller = security guard giving you a visitor badge (the JWT).
// verifyUser middleware = security checks at each door making sure your badge is valid before letting you into different rooms (routes).
//Verify = Yes, badge is valid, and here’s the person wearing it.”