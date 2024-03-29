const User = require('../models/User')
const bcrypt = require('bcryptjs');
const generateToken = require('../config/jwt');


const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email })

        if (!user) return res.status(404).json('User Not Exist')

        const isPassowrdCorrect = await bcrypt.compare(password, user.password)

        if (!isPassowrdCorrect) return res.status(403).json("Wrong Credentials")

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            admin: user.admin,
            token: generateToken(user)
        })

    } catch (error) {
        return res.status(500).json(error);
    }

}


const register = async (req, res) => {

    const { username, password, email, phone } = req.body

    try {

        const user = await User.findOne({ $or: [{ username }, { email }] })

        if (user) return res.status(400).json("Username or Email Already Exists")

        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(password, salt)

        const newUser = await User.create({ username, password: newPass, email, phone })

        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            phone: newUser.phone,
            admin: newUser.admin,
            token: generateToken(newUser)
        })

    } catch (error) {
        return res.status(500).json(error);
    }

}

// Admin
const getAllUser = async (req, res) => {

    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password").sort({createdAt : -1})

        if (!users) return res.status(404).json('No User Found')

        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = { login, register, getAllUser }