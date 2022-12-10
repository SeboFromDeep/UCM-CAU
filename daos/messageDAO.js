"use strict"
class MessageDAO{
    constructor(pool) {
        this.pool=pool;
    }
   
    
    getMessage(idMessage,callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                
                connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idAviso = ?",[idMessage],
                function(e, rows){
                    connection.release();
                    if(e) callback("Error al acceso de la base de datos de getMessage");
                    else callback(null, rows[0]);
                });
                
            }
        });
    }

    getMyMessagesUser(idUser,callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                connection.query("SELECT AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreTecnico, AVI.estado FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.tecnico = USU.idUsuario WHERE AVI.idUsuario = ? and AVI.estado = 'ACTIVO';",[idUser],
                function(e, rows){
                    
                    connection.release();
                    if(e) callback("Error al acceso de la base de datos de getMyMessageUser");
                    else {
                        let messages = []
                        rows.forEach(message => {
                            messages.push({
                                fecha: message.fecha.toLocaleDateString(),
                                texto: message.texto,
                                tipo: message.tipo,
                                grupo: message.grupo,
                                subgrupo: message.subgrupo,
                                tecnico: message.nombreTecnico,
                                estado: message.estado
                            })
                        });
                        callback(null, messages)
                    }
                });
                
            }
        });
    }

    getHistoricMessageUser(idUser,callback){

        this.pool.getConnection(function(e,connection){
            if(e){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                connection.query("SELECT AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreTecnico, AVI.estado FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.tecnico = USU.idUsuario WHERE AVI.idUsuario = ? and AVI.estado = 'CERRADO';",[idUser],
                function(e, rows){
                    
                    connection.release();
                    if(e) callback("Error al acceso de la base de datos de getHistoricalMessageuser");
                    else {
                        let messages = []
                        rows.forEach(message => {
                            messages.push({
                                fecha: message.fecha.toLocaleDateString(),
                                texto: message.texto,
                                tipo: message.tipo,
                                grupo: message.grupo,
                                subgrupo: message.subgrupo,
                                tecnico: message.nombreTecnico,
                                estado: message.estado
                            })
                        });
                        callback(null, messages)
                    }
                });
                
            }
        });
    }

    getMyMessagesTecnico(idTecnico, callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                connection.query("SELECT AVI.idAviso, AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreUsuario FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.idUsuario = USU.idUsuario WHERE AVI.tecnico = ? and AVI.estado = 'ACTIVO';", [idTecnico],
                function(e, rows){
                    connection.release();
                    if(e) callback("Error al acceso de la base de datos de getMyMessagesTecnico");
                    else {
                        let messages = []
                        rows.forEach(message => {
                            messages.push({
                                id: message.idAviso,
                                fecha: message.fecha.toLocaleDateString(),
                                texto: message.texto,
                                tipo: message.tipo,
                                grupo: message.grupo,
                                subgrupo: message.subgrupo,
                                usuario: message.nombreUsuario,
                            })
                        });
                        callback(null, messages)
                    }
                }); 
            }
        });
    }

    getMyHistoricMessagesTecnico(idTecnico, callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                connection.query("SELECT AVI.idAviso, AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreUsuario FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.idUsuario = USU.idUsuario WHERE AVI.tecnico = ? and AVI.estado = 'CERRADO';", [idTecnico],
                function(e, rows){
                    connection.release();
                    if(e) callback("Error al acceso de la base de datos de getMyHistoricMessagesTecnico");
                    else {
                        let messages = []
                        rows.forEach(message => {
                            messages.push({
                                id: message.idAviso,
                                fecha: message.fecha.toLocaleDateString(),
                                texto: message.texto,
                                tipo: message.tipo,
                                grupo: message.grupo,
                                subgrupo: message.subgrupo,
                                usuario: message.nombreUsuario,
                            })
                        });
                        callback(null, messages)
                    }
                }); 
            }
        });
    }


    createMessage(idUsuario,aviso,callback){ //aviso contiene  {tipo, fecha, texto}. no es necesario insertar el id
        this.pool.getConnection(function(e,connection){
            if(e){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                
                connection.query("INSERT INTO UCM_AW_CAU_AVI_Avisos(idUsuario, tipo, fecha, texto) ",[idUsuario,aviso.tipo, aviso.fecha, aviso.texto],
                function(e, rows){
                    connection.release();
                    if(e) callback("Error al acceso de la base de datos de createMessage");
                    else callback(null)
                });
            }
        });
    }

    finishMessage(id, comments, callback){ //aquí el técnico se dispone a hacerle el comentario.
        this.pool.getConnection(function(error,connection){
            if(error){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                
                connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET comentarios = ?, estado = 'TERMINADO' WHERE idAviso = ?", [comments, id],
                function(error, result){
                    connection.release();
                    if(error) callback("Error al acceso de la base de datos de finishMessage");
                    else callback(null)
                });
                
            }
        });
    }

    deleteMessage(id, comments, callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback("Error de la conexion de la base de datos de los avisos")
            }
            else{
                
                connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET comentarios = ?, estado = 'BORRADO' WHERE idAviso = ?", [comments, id],
                function(error, result){
                    connection.release();
                    if(error) callback("Error al acceso de la base de datos de deleteMessage");
                    else callback(null)
                });
                
            }
        });
    }


}


module.exports = MessageDAO







