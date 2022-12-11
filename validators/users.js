const {check, validationResult} = require("express-validator")

const validateSignup = [
    check("email", "Introduce tu correo UCM")
    .custom((value, {req}) => {
        if (!value.endsWith("@ucm.es")) throw new Error("Introduce tu correo UCM")
        return true
    }),
    check("username", "Introduce tu Nombre de Usuario")
    .notEmpty(),
    check("password")
    .isLength({min: 8, max:16}).withMessage("La contraseña debe tener entre 8 y 16 caracteres")
    .custom((value, {req}) => {
        let pattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/)
        if (!pattern.test(value)) throw new Error("La contraseña debe tener un dígito, una minúscula, una mayúscula y un carácter especial")
        return true
    }),
    check("passwordConfirmation")
    .custom((value, {req}) => {
        if (value != req.body.password) throw new Error("Las contraseñas no coinciden")
        return true
    }),
    check("profile")
    .custom((value, {req}) => {
        if (!value) throw new Error("Indica el perfil de tu usuario")
        return true
    }),
    check("employeeID")
    .custom((value, {req}) => {
        if (req.body.isTechnician) {
            let pattern = /(^[0-9]{4})([-])([a-z]{3})$/
            if (!pattern.test(value)) throw new Error("Nº de Empleado incorrecto") 
        }
        return true
    }),
    (req, res, next) => {
        next()
    }
]

module.exports = {validateSignup}