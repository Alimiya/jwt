const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger/swagger')
const cors = require("cors")

const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")
const path = require("path");

dotenv.config({path: './config/.env'})

// app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "html")
app.set("views", __dirname + "/views")
app.engine('html', require('ejs').renderFile)
app.use(express.static(path.join(__dirname, 'public')))

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)

app.get("/", (req, res) => {
    res.render('index')
    res.send(`It works`)
})
app.get("/login", (req, res) => {
    res.render('login')
})
app.get("/register", (req, res) => {
    res.render('register')
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const start = async () => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI, {
                useNewUrlParser: true, useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Database is connected")
            })
            .catch((error) => console.log(error.message))
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on PORT = ${process.env.PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()

