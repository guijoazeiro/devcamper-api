const express = require('express')
const router = express.Router()
const {
    register,
    login,
    getsMe,
    forgotPassword,
    resetPassword
} = require('../controllers/auth')

const {protect} = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login),router.get('/me', protect, getsMe)
router.post('/login', login),router.post('/forgotpassword',  forgotPassword)
router.post('/login', login),router.put('/resetpassword/:resetToken',  resetPassword)


module.exports = router