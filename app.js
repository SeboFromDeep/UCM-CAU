// Importar módulos externos
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const multer = require("multer")

//Importar módulos internos
const usersController = require("./controllers/usersController")
const userController = new usersController()
const userValidator = require("./validators/users")
const { check } = require("express-validator")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "/public/img"))
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})


// * Crear un servidor Express.js
const app = express()
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({storage: storage, dest: path.join(__dirname, "/public/img")}).single("user-image"))
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
    res.status(200).render("login", {registered: false, errors: null})
})
.post("/login", (req, res) => {
    // TODO: comprobaciones de login
    res.status(200).json(req.body)
})

app
.get("/signup", (req, res) => {
    res.status(200).render("signup", {errors: null})
})
.post("/signup",
    userValidator.validateSignup,
    (req, res) => {
    userController.signUp(req, res)
})