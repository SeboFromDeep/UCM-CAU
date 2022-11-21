const {check, validationResult} = require("express-validator")

// TODO: validar que la contraseña sea alfanumérica, y el formato del número de empleado
const validateSignup = [
    check("email", "Introduce tu correo UCM")
    .custom((value, {req}) => {
        if (!value.endsWith("@ucm.es")) throw new Error("Introduce tu correo UCM")
        return true
    }),
    check("password")
    .isLength({min: 8, max:16}).withMessage("La contraseña debe tener entre 8 y 16 caracteres"),
    check("password-confirmation")
    .custom((value, {req}) => {
        if (value != req.body.password) throw new Error("Las contraseñas no coinciden")
        return true
    }),
    (req, res, next) => {
        next()
    }
]

module.exports = {validateSignup}