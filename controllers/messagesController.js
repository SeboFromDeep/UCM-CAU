"use strict"

const mysql = require("mysql")
const DAOMessages = require("./../daos/DAOUsers")
const DAOUsers = require("./../daos/DAOUsers")
const config = require("./../config")

const pool = mysql.createPool(config.mysqlConfig)

const daoMessages = new DAOMessages(pool)
const daoUsers = new DAOUsers(pool)

class messagesController {
    getMyMessages(req, res) {
        daoUsers.getUserByEmail(req.session.currentUser,
            (error, user) => {
                if (error) res.json(error)
                else {
                    res.locals.user = user
                    console.log(res.locals.user)
                    res.render("userMainPage")
                }
            })
    }
}

module.exports = messagesController
