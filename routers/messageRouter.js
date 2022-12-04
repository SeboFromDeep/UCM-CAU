"use strict"

const { json } = require("body-parser")
const { Router, request } = require("express")
const express = require("express")
const mysql = require("mysql")
const config = require("../config")
const usersController = require("./../controllers/userController")
const messagesController = require("./../controllers/messageController")
const DAOMessages = require("./../daos/messageDAO")
const DAOUsers = require("./../daos/userDAO")

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia del usersController
const userController = new usersController()
const messageController = new messagesController()

// Crear una instancia de DAOMessages
const daoMessages = new DAOMessages(pool);

const messageRouter = express.Router()

messageRouter.use(userController.isUserAuthenticated)

messageRouter
.get("/", (req, res) => {
    res.status(200).redirect("/messages/my-messages")
})

messageRouter
.get("/my-messages", messageController.getMyMessages)

module.exports = messageRouter