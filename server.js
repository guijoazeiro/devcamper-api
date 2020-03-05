const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const errorHandling = require('./middleware/error')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

connectDB()

const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')
const auth = require('./routes/auth')


const app = express();

app.use(express.json())


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(fileUpload())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)
app.use('/api/v1/auth', auth)

app.use(errorHandling)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))