"use strict"

const { json } = require("body-parser")
const { Router, request } = require("express")
const express = require("express")
const mysql = require("mysql")
const config = require("../config")
const UserController = require("./../controllers/userController")
const UserDAO = require("../daos/userDAO")

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia del usersController
const userController = new UserController()

// Crear una instancia de DAOUsers
const userDAO = new UserDAO(pool);

const userRouter = express.Router()

userRouter.use(userController.isUserAuthenticated)

userRouter
.get("/userImg", (req, res) => {
    userDAO.getUserImageName(req.session.currentUser, function(err, image) {
        if (err) res.status(500).json(err)
        else {
            if (image === null) image = "noUser.png"
            
            res.sendFile(image, {root: "./public/img/"})
        }
    })
})

userRouter
.get("/user-management", userController.getActiveUsers)

module.exports = userRouter