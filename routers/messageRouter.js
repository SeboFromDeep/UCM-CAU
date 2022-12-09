"use strict"

const { json } = require("body-parser")
const { Router, request } = require("express")
const express = require("express")
const mysql = require("mysql")
const config = require("../config")
const UserController = require("./../controllers/userController")
const MessageController = require("./../controllers/messageController")
const MessageDAO = require("./../daos/messageDAO")
const UserDAO = require("./../daos/userDAO")

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia del usersController
const userController = new UserController()
const messageController = new MessageController()

const messageRouter = express.Router()

messageRouter.use(userController.isUserAuthenticated)

messageRouter
.get("/", (req, res) => {
    res.status(200).redirect("/messages/my-messages")
})

messageRouter
.get("/my-messages", messageController.getMyMessages)

messageRouter
.post("/finish-message/:id", userController.isUserTechnician, messageController.finishMessage)

messageRouter
.post("/delete-message/:id", userController.isUserTechnician, messageController.deleteMessage)

messageRouter
.get("/message-options", messageController.getMessageOptions)

module.exports = messageRouter