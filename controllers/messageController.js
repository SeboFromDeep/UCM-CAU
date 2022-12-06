"use strict"

const mysql = require("mysql")
const MessageDAO = require("../daos/messageDAO")
const UserDAO = require("../daos/userDAO")
const config = require("../config")


const pool = mysql.createPool(config.mysqlConfig)

const messageDAO = new MessageDAO(pool)
const userDAO = new UserDAO(pool)

const uC = require("./userController")

const userController = new uC()

class messagesController {
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

    finishMessage(req, res) {
        messageDAO.finishMessage(req.params.id, req.body.comments, (error) => {
            if (error) res.json(error)
            else res.status(200).redirect("/messages/my-messages")
        })
    }
}

module.exports = messagesController
