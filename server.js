const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const errorHandling = require('./middleware/error')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

connectDB()

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')
const users = require('./routes/users')
const reviews = require('./routes/reviews')


const app = express();

app.use(express.json())

app.use(cookieParser())


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(fileUpload())

app.use(mongoSanitize())

app.use(helmet())

app.use(xss())


const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 1
})

app.use(limiter)

app.use(hpp())

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)
app.use('/api/v1/reviews', reviews)

app.use(errorHandling)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))