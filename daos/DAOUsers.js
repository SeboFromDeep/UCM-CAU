"use strict"
const utils = require("./utils")



class DAOUsers {
    constructor(pool) {
        this.pool = pool
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE email = ? AND password = ?", [email, password],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        if (rows == 0) callback(null, false)
                        else callback(null, true)
                    }
                })
            }
        })
    }
    insertUser(user, callback){
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT idUser FROM UCM_AW_CAU_USU_Usuarios WHERE email = ?", [email],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        if (rows != 0) callback(new Error("Ya existe este usuario"))
                        else {
                            
                            //usuario técnico
                            if(user.tecnico === 1){
                                connection.query("INSERT INTO UCM_AW_CAU_USU_Usuarios (nombre, email, password, perfil, tecnico , nEmpleado, img) values(?,?,?)",)
                            }
                            
                        }
                    }
                })
            }
        })      
    }

    isProperPassword(password,callback){ //cuano el usuario quiera crear una cuenta, tenemos que ver si la contraseña es correcta antes de hacer toda la parafernalia

        var res= password.search(/[A-Z]/);  //tiene que tener al menos una mayuscula
        if(res===-1) callback(null,false);
        res= password.search(/[a-z]/);  //tiene que tener al menos una minuscula
        if(res===-1) callback(null,false);
        res= password.search(/[\W]/);  //tiene que tener al menos un caracter no alfanumérico
        if(res===-1) callback(null,false);
        res= password.search(/\d/);  //tiene que tener al menos un digito
        if(res===-1) callback(null,false);
        
        if(password.length >=8 && password.length<= 16) callback(null,true);
    }

    getUserImageName(email, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT img FROM UCM_AW_CAU_USU_Usuarios WHERE email = ?", [email],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        if (rows == 0) callback(new Error("No existe el usuario"))
                        else callback(null, rows[0].img)
                    }
                })
            }
        })        
    }
}

module.exports = DAOUsers