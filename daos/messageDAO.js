"use strict"

class MessageDAO{
    constructor(pool) {
        this.pool=pool;
    }
   
    
    getMessage(idMessage,callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                
                connection.query("SELECT * FROM UCM_AW_CAU_AVI_Avisos WHERE idAviso = ?",[idMessage],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else callback(null, rows[0]);
                });
                
            }
        });
    }

    getMyMessagesUser(idUser,callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                connection.query("SELECT AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreTecnico, AVI.estado FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.tecnico = USU.idUsuario WHERE AVI.idUsuario = ? and AVI.estado = 'ACTIVO';",[idUser],
                function(e, rows){
                    
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
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
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                connection.query("SELECT AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreTecnico, AVI.estado FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.tecnico = USU.idUsuario WHERE AVI.idUsuario = ? and AVI.estado <> 'ACTIVO';",[idUser],
                function(e, rows){
                    
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
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
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                connection.query("SELECT AVI.idAviso, AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreUsuario FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.idUsuario = USU.idUsuario WHERE AVI.tecnico = ? and AVI.estado = 'ACTIVO';", [idTecnico],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
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
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                connection.query("SELECT AVI.idAviso, AVI.fecha, AVI.texto, AVI.tipo, AVI.grupo, AVI.subgrupo, USU.nombre as nombreUsuario FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.idUsuario = USU.idUsuario WHERE AVI.tecnico = ? and AVI.estado = 'CERRADO';", [idTecnico],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
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


    createMessage(idUser, message, callback){ 
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(new Error('Error de Conexión'))
            }
            else{
                if (message.type === 'Sugerencia') message.type = message.select
                console.log(idUser, message)
                connection.query("INSERT INTO UCM_AW_CAU_AVI_Avisos(idUsuario, tipo, grupo, subgrupo, texto) values (?, ?, ?, ?, ?)",[idUser, message.type, message.group, message.subgroup, message.text],
                function(e, rows){
                    connection.release();
                    if(e) callback(new Error('Error de Acceso'))
                    else callback(null)
                });
            }
        });
    }

    finishMessage(id, comments, callback){ //aquí el técnico se dispone a hacerle el comentario.
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                
                connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET comentarios = ?, estado = 'TERMINADO' WHERE idAviso = ?", [comments, id],
                function(error, result){
                    connection.release();
                    if(error) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else callback(null)
                });
                
            }
        });
    }

    deleteMessage(id, comments, callback){
        this.pool.getConnection(function(error,connection){
            if(error){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                
                connection.query("UPDATE UCM_AW_CAU_AVI_Avisos SET comentarios = ?, estado = 'BORRADO' WHERE idAviso = ?", [comments, id],
                function(error, result){
                    connection.release();
                    if(error) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else callback(null)
                });
                
            }
        });
    }

    getMessageOptions(profile, callback) {
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                connection.query("SELECT * FROM ucm_aw_cau_cat_categorias where PERFIL = ? order by categoria, grupo, subgrupo;", [profile],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else {
                        let options = {}
                        rows.forEach(row => {
                            if (options[row.categoria] === undefined) options[row.categoria] = {}

                            if (options[row.categoria][row.grupo] === undefined) options[row.categoria][row.grupo] = []

                            options[row.categoria][row.grupo].push(row.subgrupo) 
                        });
                        callback(null, options)
                    }
                }); 
            }
        });
    }

}


module.exports = MessageDAO







