const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const errorHandling = require('./middleware/error')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

connectDB()

const bootcamps = require('./routes/bootcamps')


const app = express();

app.use(express.json())


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/bootcamps', bootcamps)

app.use(errorHandling)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))