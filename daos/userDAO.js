"use strict"

class UserDAO {
    constructor(pool) {
        this.pool = pool
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE correo = ? AND contrasena = ? AND activo = 1", [email, password],
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

    deleteUser(idUser, callback){
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("UPDATE ucm_aw_cau_usu_usuarios USU, ucm_aw_cau_avi_avisos AVI SET USU.activo = 0, AVI.estado = 'USUARIO BORRADO' WHERE USU.idUsuario = ? AND USU.idUsuario = AVI.idUsuario AND AVI.estado = 'ACTIVA';", [idUser],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        callback(null)
                    }
                })
            }
        })
    }

    deleteTechnician(idUser, callback){
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("UPDATE ucm_aw_cau_usu_usuarios USU, ucm_aw_cau_avi_avisos AVI SET USU.activo = 0, AVI.tecnico = NULL WHERE USU.idUsuario = ? AND USU.idUsuario = AVI.tecnico AND AVI.estado = 'ACTIVA';", [idUser],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        callback(null)
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
                            signupDate: rows[0].fecha_registro.toLocaleDateString()
                        })
                    }
                })
            }
        })
    }

    getUserByID(id, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT * FROM ucm_aw_cau_usu_usuarios WHERE idUsuario = ?", [id],
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
                            signupDate: rows[0].fecha_registro.toLocaleDateString()
                        })
                    }
                })
            }
        })
    }

    getActiveUsers(idUser, callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))

            else {
                c.query("SELECT idUsuario, fecha_registro, nombre, tecnico FROM ucm_aw_cau_usu_usuarios WHERE idUsuario <> ? AND activo = 1", [idUser],
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    else {
                        callback(null, rows)
                    }
                })
            }
        })
    }

    getActiveTechnicians(callback) {
        this.pool.getConnection(function(e, c) {
            if (e) callback(new Error("Error de la conexion de la base de datos del usuario"))
            else {
                c.query("SELECT idUsuario, nombre FROM ucm_aw_cau_usu_usuarios WHERE tecnico = 1 AND activo = 1",
                function(e, rows) {
                    c.release()
                    if (e) callback(new Error("Error al acceso de la base de datos"))
                    
                    else {
                        let users = {}
                        rows.forEach((user) => {
                            users[user.idUsuario] = user.nombre
                        })
                        callback(null, users)
                    }
                })
            }
        })        
       }
}

module.exports = UserDAO