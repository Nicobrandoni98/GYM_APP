const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
    const {body} = request  
    const {username, password} = body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null   
    ? false
    : await bcrypt.compare(password, user.passwordHash)
    
    // Verifico tanto el user como el password
    if (!(user && passwordCorrect)) {
        response.status(401).json({
            error: 'Invalid user or password'
        })
    }
    const userForToken = {
        id: user._id,
        username: user.username
    }
    // Creo el token para el usuario y le doy 1 dia de expiracion
    // eslint-disable-next-line no-undef
    const token = jwt.sign(userForToken, process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24
        }
    )

    response.send({
        name: user.name,
        username: user.username,
        token
    })
})

module.exports = loginRouter