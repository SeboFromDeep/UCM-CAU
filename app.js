// Importar módulos externos
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

//Importar módulos internos
const usersController = require("./controllers/usersController")
const userController = new usersController()
const userValidator = require("./validators/users")
const { check } = require("express-validator")


// * Crear un servidor Express.js
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")


// * Arrancar el servidor
// TODO: añadir middleware de acceso a las vistas
app.listen(3000, () => console.log("Hola mundo :)"))

// * Routers
// const usersRouter = require("./routers/usersRouter")
// app.use("/users", usersRouter)

// const messagesRouter = require("./routers/messagesRouter")
// app.use("/messages", messagesRouter)

// Inicio de Sesión
app
.get("/login", (req, res) => {
    res.status(200).render("login")
})
.post("/login", (req, res) => {
    // TODO: comprobaciones de login
    res.status(200).json(req.body)
})

app
.get("/signup", (req, res) => {
    res.status(200).render("signup")
})
.post("/signup",
    userValidator.validateSignup,
    (req, res) => {
    userController.signUp(req, res)
})