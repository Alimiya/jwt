const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const registerSchema = require("../schemas/registerSchema")
const loginSchema = require("../schemas/loginSchema")

exports.register = async (req, res) => {
    const {fname, lname, email, password} = req.body
    const emailExist = await User.findOne({email})

    if (emailExist) {
        res.status(400).send("Email already exists")
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
        fname,
        lname,
        email,
        password: hashedPassword,
    })

    try {
        const {error} = await registerSchema.validateAsync(req.body)

        if (error) {
            res.status(400).send(error.details[0].message)
        } else {
            const saveUser = await user.save()
            res.status(200).send("User successfully created")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (!user) return res.status(400).send("Incorrect email")

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send("Incorrect Password")

    try {
        const {error} = await loginSchema.validateAsync(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        else {
            const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
            res.header("Authorization", `Bearer ${token}`).json(token)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
