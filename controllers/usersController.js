"use strict"

const {check, validationResult} = require("express-validator")

class userController {
    signUp(req, res) {
        // console.log(req.body)
        // console.log(req.file)
        const errors = validationResult(req).errors
        if (errors.length === 0) res.render("login", {registered: true, errors: null})
        else res.render("signup", {errors: errors})
    }
}

module.exports = userController