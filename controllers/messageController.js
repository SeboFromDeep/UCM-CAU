"use strict"

const mysql = require("mysql")
const MessageDAO = require("../daos/messageDAO")
const UserDAO = require("../daos/userDAO")
const config = require("../config")


const pool = mysql.createPool(config.mysqlConfig)

const messageDAO = new MessageDAO(pool)
const userDAO = new UserDAO(pool)

const uC = require("./userController")
const { json } = require("body-parser")

const userController = new uC()

class messagesController {
    assignMessage(req, res) {
        messageDAO.assignMessage(req.body.technician, req.params.id, (error) => {
            if (error) res.json(error)
            else res.status(200).redirect("/messages/my-messages")
        })
    }

    getMyMessages(req, res) {
        userDAO.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    res.locals.user = user
                   
                    if (!user.technician) {
                        messageDAO.getMyMessagesUser(user.userID,
                            (error, messages) => {
                                if (error) res.json(error)
                                else res.status(200).render("userMainPage", {messages: messages, current: ".mis-avisos"})
                            }
                        )
                    }
                    else {
                        messageDAO.getMyMessagesTecnico(user.userID,
                            (error, messages) => {
                                if (error) res.json(error)
                                else res.status(200).render("technicianMainPage", {messages: messages, current: ".mis-avisos"})
                            }
                        )
                    }
                }
            })
    }

    getHistoricMessages(req, res) {
        userDAO.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    res.locals.user = user
                    
                    if (!user.technician) {
                        messageDAO.getHistoricMessageUser(user.userID,
                            (error, messages) => {
                                if (error) res.json(error)
                                else res.status(200).render("userMainPage", {messages: messages, current: ".historico-de-avisos"})
                            }
                        )
                    }
                    else {
                        messageDAO.getMyHistoricMessagesTecnico(user.userID,
                            (error, messages) => {
                                if (error) res.json(error)
                                else res.status(200).render("technicianMainPage", {messages: messages, current: ".historico-de-avisos"})
                            }
                        )
                    }
                }
            })
    }

    getEntryMessages(req,res){
        userDAO.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    res.locals.user = user
                    messageDAO.getAllActiveMessages((error, messages) => {
                            if (error) res.json(error)
                            else res.status(200).render("technicianMainPage", {messages: messages, current: ".avisos-entrantes"})
                        }
                    ) 
                }
            })
    }

    finishMessage(req, res) {
        messageDAO.finishMessage(req.params.id, req.body.comments, (error) => {
            if (error) res.json(error)
            else res.status(200).redirect("/messages/my-messages")
        })
    }

    deleteMessage(req, res) {
        messageDAO.deleteMessage(req.params.id, req.body.comments, (error) => {
            if (error) res.json(error)
            else res.status(200).redirect("/messages/my-messages")
        })
    }

    getMessageOptions(req, res) {
        userDAO.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    messageDAO.getMessageOptions(user.profile, (error, options) => {
                        if (error) res.json(error)
                        else {
                            res
                            .setHeader('content-type', 'application/json')
                            .json(options);
                        }
                    })
                }
            })
    }

    createMessage(req, res) {
        userDAO.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    res.locals.user = user

                    messageDAO.createMessage(user.userID, req.body, (error) => {
                        console.log(error)
                        if (error) res.json(error)
                        else {
                            res.status(200).redirect('/messages/my-messages')
                        }
                    })
                }
            })
    }
}

module.exports = messagesController
