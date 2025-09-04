import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const verifyUser = async (req, res, next) => {
    try {
        console.log(req.headers.authorization);

        //Check for JWT in the Authorization header
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(404).json({ success: false, error: "Token Not Provided" })
        }

        //Verify the token using secret key
        //Decode token → extract user ID
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token Not Valid" })
        }

        //Fetch user from DB (without password)
        const user = await User.findById({ _id: decoded._id }).select('-password')
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" })
        }

        req.user = user//Attach user info to req.user
        next()
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error" })
    }
}

export default verifyUser