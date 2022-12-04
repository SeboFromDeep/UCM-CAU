"use strict"

class UserDAO {
    constructor(pool) {
        this.pool = pool
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE correo = ? AND contrasena = ?", [email, password],
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
                c.query("SELECT idUsuario FROM ucm_aw_cau_usu_usuarios WHERE correo = ?", [user.correo],
                function(e, rows) {
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        if (rows != 0) callback(new Error("Ya existe este usuario"))
                        else {
                            
                            //usuario técnico
                            if(user.tecnico === 1){
                                c.query("INSERT INTO ucm_aw_cau_usu_usuarios (nombre, correo, contrasena, perfil, tecnico , nEmpleado, img) values(?,?,?, PAS, 1, ?, ?)",
                                [user.nombre,user.correo,user.contrasena,user.nEmpleado,user.img], function(e, rows){
                                    c.release()
                                    if (e) callback(new Error("Error al acceso de la base de datos"))
                                    else callback(null,true)
                                });
                            }
                            //usuario no técnico
                            else{ 
                                c.query("INSERT INTO ucm_aw_cau_usu_usuarios (nombre, correo, contrasena, perfil, tecnico , nEmpleado, img) values(?,?,?, ?, 0, NULL, ?)",
                                [user.nombre,user.correo,user.contrasena,user.perfil,user.img], function(e, rows){
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

    // TODO: no se borra se pone activo a 0
   deleteUser(idUser,callback){
    this.pool.getConnection(function(e, c) {
        if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

        else {
            c.query("DELETE FROM ucm_aw_cau_usu_usuarios WHERE idUsuario = ? ", [idUser],
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
            c.query("SELECT tecnico FROM ucm_aw_cau_usu_usuarios WHERE idUsuario = ? ", [idUser],
            function(e, rows) {
                c.release()
                if (e) callback(new Error("Error al acceso de la base de datos"))
                
                else {
                    if (rows.length === 0) callback(null, false)
                    else callback(null, true)
                }
            })
        }
    })
   }

   
   getTecnicos(callback){
    this.pool.getConnection(function(e, c) {
        if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

        else {
            c.query("SELECT idUsuario, nombre FROM ucm_aw_cau_usu_usuarios WHERE tecnico = 1",
            function(e, rows) {
                c.release()
                if (e) callback(new Error("Error al acceso de la base de datos"))
                
                else {
                    if (rows == 0) callback(new Error("No existe el usuario"))
                    else callback(null, rows)
                }
            })
        }
    })        
   }

    getUserImageName(email, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT img FROM ucm_aw_cau_usu_usuarios WHERE correo = ?", [email],
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

    getUserId (email,callback){
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT idUsuario FROM ucm_aw_cau_usu_usuarios WHERE correo = ?", [email],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    else {
                        if (rows == 0) callback(null, false)
                        else callback(rows[0], true)
                    }
                })
            }
        })
    }

    getUserByEmail(email, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE correo = ?", [email],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    else {
                        if (rows == 0) callback(null, false)
                        else callback(null, {
                            userID: rows[0].idUsuario,
                            username: rows[0].nombre,
                            email: rows[0].correo,
                            password: rows[0].contrasena,
                            profile: rows[0].perfil,
                            technician: rows[0].tecnico === 0 ? false : true,
                            employeeID: rows[0].nEmpleado,
                            img: rows[0].img !== null ? rows[0].img : "noUser.png"
                        })
                    }
                })
            }
        })
    }
}

module.exports = UserDAO