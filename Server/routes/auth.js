import express from "express"
import { registerUser, loginUser, verify, upload } from '../controller/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', upload.single('profilePhoto'), registerUser)
router.post('/login', loginUser)
router.get('/verify', authMiddleware, verify)


export default router