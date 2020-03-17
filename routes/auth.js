const express = require('express')
const router = express.Router()
const {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetails,
    updatePassword,
    logout
} = require('../controllers/auth')

const { protect } = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login),
router.get('/logout', logout),
router.get('/me', protect, getMe),
router.put('/updatedetails', protect, updateDetails),
router.put('/updatepassword', protect, updatePassword),
router.post('/forgotpassword', forgotPassword)
router.post('/login', login), 
router.put('/resetpassword/:resetToken', resetPassword)


module.exports = router