const UserModel = require("../Models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ massage: "User is already exist, you can login" })
        }

        const userModel = new UserModel({ name, email, password })
        userModel.password = await bcrypt.hash(password, 10)
        await userModel.save()

        res.status(201).json({ massage: "Signup success ", success: true, data: userModel })

    } catch (err) {
        res.status(500).json({ massage: "Signup fail ", success: false, err })
    }
}


const login = async (req, res) => {
    try {
        const {  email, password } = req.body

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ massage: "Auth fail email  is wrong", success: false })
        }

        const isPassEqual = await bcrypt.compare(password, user.password)

        if (!isPassEqual) {
            return res.status(403).json({ massage: "Auth fail  password is wrong", success: false })
        }

        //then create jwt token
        const tokenObject = {
            _id: user._id,
            email: user.email
        }

        const jwtToken = jwt.sign({tokenObject}, process.env.JWT_TOKEN, { expiresIn: "24h" })
        

        res.status(201).json({ massage: "Login success ", success: true, data: user, jwtToken })

    } catch (err) {
        res.status(500).json({ massage: "Login fail ", success: false, err })
    }
}

module.exports = { signup,login }