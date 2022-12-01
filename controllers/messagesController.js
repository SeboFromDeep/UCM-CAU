"use strict"

const mysql = require("mysql")
const DAOMessages = require("./../daos/DAOMessages")
const DAOUsers = require("./../daos/DAOUsers")
const config = require("./../config")

const pool = mysql.createPool(config.mysqlConfig)

const daoMessages = new DAOMessages(pool)
const daoUsers = new DAOUsers(pool)

const uC = require("./usersController")

const userController = new uC()

class messagesController {
    getMyMessages(req, res) {
        daoUsers.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    res.locals.user = user

                    if (!user.technician) {
                        daoMessages.getMyMessagesUser(user.userID,
                            (error, messages) => {
                                if (error) res.json(error)
                                else res.render("userMainPage", {messages: messages})
                            }
                        )
                    }
                    else {
                        daoMessages.getMyMessagesTecnico(user.userID,
                            (error, messagesList) => {
                                if (error) res.json(error)
                                else messages = messagesList
                            }
                        )
                    }
                }
            })
    }
}

module.exports = messagesController
