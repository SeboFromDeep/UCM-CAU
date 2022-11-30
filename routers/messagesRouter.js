"use strict"

const { json } = require("body-parser")
const { Router, request } = require("express")
const express = require("express")
const mysql = require("mysql")
const config = require("./../config")
const usersController = require("./../controllers/usersController")
const messagesController = require("./../controllers/messagesController")
const DAOMessages = require("./../daos/DAOMessages")
const DAOUsers = require("./../daos/DAOUsers")

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia del usersController
const userController = new usersController()
const messageController = new messagesController()

// Crear una instancia de DAOMessages
const daoMessages = new DAOMessages(pool);

const messagesRouter = express.Router()

messagesRouter.use(userController.isUserAuthenticated)

messagesRouter
.get("/", (req, res) => {
    res.status(200).redirect("/messages/my-messages")
})

messagesRouter
.get("/my-messages", messageController.getMyMessages)

module.exports = messagesRouter