"use strict"

const express = require("express")
const mysql = require("mysql")
const config = require("../config")
const UserController = require("./../controllers/userController")
const MessageController = require("./../controllers/messageController")

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
.get("/entry-messages",messageController.getEntryMessages)
.get("/my-messages", messageController.getMyMessages)
.get("/his-messages",messageController.getHistoricMessages)
.get("/message-options", messageController.getMessageOptions)

messageRouter
.post("/assign-message/:id", userController.isUserTechnician, messageController.assignMessage)
.post("/delete-unassigned-message/:id", userController.isUserTechnician, messageController.deleteUnassignedMessage)
.post("/finish-message/:id", userController.isUserTechnician, messageController.finishMessage)
.post("/delete-message/:id", userController.isUserTechnician, messageController.deleteMessage)
.post("/create-message", messageController.createMessage)

module.exports = messageRouter