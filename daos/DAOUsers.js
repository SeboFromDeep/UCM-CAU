"use strict"

class DAOUsers {
    constructor(pool) {
        this.pool = pool
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE email = ? AND password = ?", [email, password],
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
                c.query("SELECT idUser FROM ucm_aw_cau_usu_usuarios WHERE email = ?", [user.email],
                function(e, rows) {
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        if (rows != 0) callback(new Error("Ya existe este usuario"))
                        else {
                            
                            //usuario técnico
                            if(user.tecnico === 1){
                                c.query("INSERT INTO ucm_aw_cau_usu_usuarios (nombre, email, password, perfil, tecnico , nEmpleado, img) values(?,?,?, pas, 1, ?, ?)",
                                [user.nombre,user.email,user.password,user.nEmpleado,user.img], function(e, rows){
                                    c.release()
                                    if (e) callback(new Error("Error al acceso de la base de datos"))
                                    else callback(null,true)
                                });
                            }
                            //usuario no técnico
                            else{ 
                                c.query("INSERT INTO ucm_aw_cau_usu_usuarios (nombre, email, password, perfil, tecnico , nEmpleado, img) values(?,?,?, ?, 0, NULL, ?)",
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
            c.query("DELETE FROM ucm_aw_cau_usu_usuarios WHERE idUser = ? ", [idUser],
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
            c.query("SELECT tecnico FROM ucm_aw_cau_usu_usuarios WHERE idUser = ? ", [idUser],
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
            c.query("SELECT idUser, nombre FROM ucm_aw_cau_usu_usuarios WHERE tecnico = 1", [email],
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
                c.query("SELECT img FROM ucm_aw_cau_usu_usuarios WHERE email = ?", [email],
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
                c.query("SELECT id FROM ucm_aw_cau_usu_usuarios WHERE email = ?", [email],
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
                c.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE email = ?", [email],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    else {
                        if (rows == 0) callback(null, false)
                        else callback(null, {
                            userID: rows[0].idUser,
                            username: rows[0].nombre,
                            email: rows[0].email,
                            password: rows[0].password,
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

module.exports = DAOUsers