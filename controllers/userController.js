"use strict"

const path = require("path")
const mysql = require("mysql")
const UserDAO = require("../daos/userDAO")
const MesssageDAO = require("../daos/messageDAO")
const config = require("../config")

const pool = mysql.createPool(config.mysqlConfig)

const userDAO = new UserDAO(pool)
const messageDAO = new MesssageDAO(pool)



const {check, validationResult} = require("express-validator")

class userController {

    isUserAuthenticated(req, res, next) {
        if (!req.session.currentUser) res.redirect("/login")
        else {
            res.locals.userEmail = req.session.currentUser
            next()
        }
    }

    isUserTechnician(req, res, next) {
        userDAO.getUserByEmail(req.session.currentUser, (error, user) => {
            if (error) res.status(400).redirect("/login")
            else {
                if (!user.technician) res.status(400).redirect("/login")
                else next()
            }
        })
    }

    login(req, res) {
        userDAO.isUserCorrect(req.body.email, req.body.password, (error, isCorrect) => {
            if (error) res.render("login", {errors: [error], registered: false})
            else {
                if (isCorrect) {
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
                correo: req.body.email,
                contrasena: req.body.password,
                perfil: req.body.profile,
                tecnico: req.body.isTechnician === "true" ? 1 : 0,
                nEmpleado: req.body.employeeID ? req.body.employeeID : null,
                img: req.file ? req.body.email.split("@")[0] + path.extname(req.file.originalname) : null
            }
            userDAO.insertUser(user, (error, inserted) => {
                if (inserted) res.render("login", {registered: true, errors: null})
                else res.render("signup", {errors: [error.message]})
            })

        }
    }

    getMessagesInfo(req, res) {
        userDAO.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    if (!user.technician) {
                        messageDAO.getUserMessagesInfo(user.userID, (error, info) => {
                            res
                            .setHeader('content-type', 'application/json')
                            .json(JSON.stringify(info));
                        }) 
                    }
                    else {
                        messageDAO.getTechnicianMessagesInfo(user.userID, (error, info) => {
                            res
                            .setHeader('content-type', 'application/json')
                            .json(JSON.stringify(info));
                        }) 

                    }
                }
            })
    }

    getActiveUsers(req, res) {
        userDAO.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    res.locals.user = user
                    userDAO.getActiveUsers(user.userID, (error, users) => {
                        if (error) res.json(error)
                        else res.status(200).render("technicianMainPage", {users: users, current: ".gestion-de-usuarios"})
                    } 
            )}
        })
    }
    
    getActiveTechnicians(req, res) {
        userDAO.getActiveTechnicians((error, users) => {
            if (error) res.json(error)
            else {
                res
                .setHeader('content-type', 'application/json')
                .json(JSON.stringify(users));
            }
        })
    }

    deleteUser(req, res) {
        userDAO.getUserByID(req.params.id,
            (error, user) => {
                if (error) res.json(error)
                else {
                    if (!user.technician) {
                        userDAO.deleteUser(user.userID, (error) => {
                            if (error) res.json(error)
                            res.status(200).redirect("/users/user-management")
                        }) 
                    }
                    else {
                        userDAO.deleteTechnician(user.userID, (error, info) => {
                            if (error) res.json(error)
                            res.status(200).redirect("/users/user-management")
                        }) 

                    }
                }
            })
    }
}

module.exports = userController