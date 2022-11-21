"use strict"

const {check, validationResult} = require("express-validator")

class userController {
    signUp(req, res) {
        const errors = validationResult(req)
        if (errors) res.json(errors)
        else res.json("no errores")
    }
}

module.exports = userController