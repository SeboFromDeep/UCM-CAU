"use strict"

const mysql = require("mysql")
const DAOUsers = require("./../daos/DAOUsers")
const config = require("./../config")

const pool = mysql.createPool(config.mysqlConfig)

const daoUser = new DAOUsers(pool)



const {check, validationResult} = require("express-validator")

class userController {

    isUserAuthenticated(req, res, next) {
        if (!req.session.currentUser) res.redirect("/login")
        else {
            res.locals.userEmail = req.session.currentUser
            next()
        }
    }

    login(req, res) {
        daoUser.isUserCorrect(req.body.email, req.body.password, (error, isCorrect) => {
            if (error) res.render("login", {errors: [error]})
            else {
                if (isCorrect) {
                    // TODO: cambiar por pagina de usuario
                    req.session.currentUser = req.body.email
                    res.status(200).redirect("/messages")
                }
                else res.status(200).render("login", {registered: false, errors: ["Dirección de correo y/o contraseña no válidos"]})
            }
        })
    }

    signUp(req, res) {
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