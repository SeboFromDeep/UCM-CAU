// Importar módulos externos
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const multer = require("multer")
const session = require("express-session")
const mySQLSession = require("express-mysql-session")
const logger = require("morgan")
const mySQLStore = mySQLSession(session)
const sessionStore = new mySQLStore({
    host: "localhost",
    user: "root",
    password: "",
    database: "practica_obligatoria"
})
const middlewareSession = session({
    saveUninitialized: false,
    secret: "secreto",
    resave: false,
    store: sessionStore
})

//Importar módulos internos
const UserController = require("./controllers/userController")
const userController = new UserController()
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
app.use(middlewareSession)
app.use(logger('dev'))
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")


// * Arrancar el servidor
// TODO: añadir middleware de acceso a las vistas
app.listen(3000, () => console.log("Hola mundo :)"))

// * Routers
const userRouter = require("./routers/userRouter")
app.use("/users", userRouter)

const messageRouter = require("./routers/messageRouter")
app.use("/messages", messageRouter)

app
.get("/", (req, res) => {
    res.redirect("/login")
})

// Inicio de Sesión
app
.get("/login", (req, res) => {
    if (req.session.currentUser) res.redirect("/messages")
    else res.status(200).render("login", {registered: false, errors: null})
})
.post("/login", userController.login)

app
.get("/logout", (req, res) => {
    req.session.destroy()
    res.status(200).redirect("/login")
})

app
.get("/signup", (req, res) => {
    if (req.session.currentUser) res.redirect("/messages")
    else res.status(200).render("signup", {errors: null})
})
.post("/signup",
    userValidator.validateSignup,
    (req, res) => {
    userController.signUp(req, res)
})