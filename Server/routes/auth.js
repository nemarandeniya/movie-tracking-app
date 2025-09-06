import express from "express"
import { registerUser, loginUser, verify, upload, getUserDetails } from '../controller/authController.js'
import verifyUser from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', upload.single('profilePhoto'), registerUser)
router.post('/login', loginUser)
router.get('/verify', verifyUser, verify)
router.get('/userprofile', verifyUser, getUserDetails)


export default router