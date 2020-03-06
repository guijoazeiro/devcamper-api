const express = require('express')
const router = express.Router()
const {
    register,
    login,
    getsMe
} = require('../controllers/auth')

const {protect} = require('../middleware/auth')

router.post('/register', register)
router.post('/login', login),router.get('/me', protect, getsMe)


module.exports = router