"use strict"

const mysql = require("mysql")
const DAOUsers = require("./../daos/DAOUsers")
const config = require("./../config")

const pool = mysql.createPool(config.mysqlConfig)

const daoUser = new DAOUsers(pool)



const {check, validationResult} = require("express-validator")

class userController {
    signUp(req, res) {
        // console.log(req.body)
        // console.log(req.file)
        const errors = validationResult(req).errors
        if (errors.length !== 0) res.render("signup", {errors: errors})
        else {
            const user = {
                nombre: req.body.username,
                email: req.body.email,
                password: req.body.password,
                perfil: req.body.profile,
                tecnico: req.body.isTechnician === "true" ? 1 : 0,
                nEmpleado: req.body.employeeID ? req.body.employeeID : null,
                img: req.file ? req.file.originalname : null
            }
            daoUser.insertUser(user, (error, inserted) => {
                if (inserted) res.render("login", {registered: true, errors: null})
                else res.render("signup", {errors: [error.message]})
            })

        }
    }
}

module.exports = userController