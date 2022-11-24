"use strict"

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
                c.query("SELECT idUser FROM UCM_AW_CAU_USU_Usuarios WHERE email = ?", [user.email],
                function(e, rows) {
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        if (rows != 0) callback(new Error("Ya existe este usuario"))
                        else {
                            
                            //usuario técnico
                            if(user.tecnico === 1){
                                c.query("INSERT INTO UCM_AW_CAU_USU_Usuarios (nombre, email, password, perfil, tecnico , nEmpleado, img) values(?,?,?, pas, 1, ?, ?)",
                                [user.nombre,user.email,user.password,user.nEmpleado,user.img], function(e, rows){
                                    c.release()
                                    if (e) callback(new Error("Error al acceso de la base de datos"))
                                    else callback(null,true)
                                });
                            }
                            //usuario no técnico
                            else{ 
                                c.query("INSERT INTO UCM_AW_CAU_USU_Usuarios (nombre, email, password, perfil, tecnico , nEmpleado, img) values(?,?,?, ?, 0, NULL, ?)",
                                [user.nombre,user.email,user.password,user.perfil,user.img], function(e, rows){
                                    c.release()
                                    if (e) callback(new Error("Error al acceso de la base de datos"))
                                    else callback(null,true)
                                });
                            }
                        }
                    }
                })
            }
        })      
    }

   deleteUser(idUser,callback){
    this.pool.getConnection(function(e, c) {
        if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

        else {
            c.query("DELETE FROM UCM_AW_CAU_USU_Usuarios WHERE idUser = ? ", [idUser],
            function(e, rows) {
                c.release()
                if (e) callback(new Error("Error al acceso de la base de datos"))
                
                else {
                    callback(null,true)
                }
            })
        }
    })
   }

   esTecnico(idUser,callback){
    this.pool.getConnection(function(e, c) {
        if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

        else {
            c.query("SELECT tecnico FROM UCM_AW_CAU_USU_Usuarios WHERE idUser = ? ", [idUser],
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