"usa strict"



class DAOMessages{
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
                connection.query("SELECT AVI.fecha, AVI.texto, AVI.tipo, USU.nombre as nombreTecnico FROM UCM_AW_CAU_AVI_Avisos AVI LEFT JOIN ucm_aw_cau_usu_usuarios USU on AVI.tecnico = USU.idUser WHERE AVI.idUsuario = ?;",[idUser],
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
                                tecnico: message.nombreTecnico
                            })
                        });
                        callback(null, messages)
                    }
                });
                
            }
        });
    }

    getMyMessagesTecnico(idTecnico,callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                
                connection.query("SELECT tipo, fecha, texto FROM UCM_AW_CAU_AVI_Avisos WHERE tecnico = ?",[idTecnico],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else {
                        let messages = []
                        rows.forEach(message => {
                            messages.push({
                                tipo: message.tipo,
                                fecha: message.fecha,
                                texto: message.texto,
                            })
                        });
                        callback(null, messages)
                    }
                });
                
            }
        });
    }

    

    insertTask(email, task, callback) {
        let idTarea, idUsuario

        this.pool.getConnection(function (e, connection) {
            if (e) callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            else {
                // Buscar Tarea 
                connection.query("SELECT idTarea FROM aw_tareas_tareas WHERE texto = ?",
                [task.text],
                function(e, rows) {
                    if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                    else {
                        // Tarea ya existe
                        if (rows.length !== 0) {
                            idTarea = rows[0].idTarea

                            // Buscar Usuario
                            connection.query("SELECT idUser FROM aw_tareas_usuarios WHERE email = ?",
                            [email],
                            function(e, rows) {
                                if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                else {
                                    idUsuario = rows[0].idUser
                                    
                                    // Asignar Tarea y Usuario
                                    connection.query("INSERT INTO aw_tareas_user_tareas (idTarea, idUser, hecho) VALUES (?, ?, ?)",
                                    [idTarea, idUsuario, task.done],
                                    function(e, result) {
                                        if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                        else {
                                            // Buscar Etiquetas
                                            for(var i = 0; i < task.tags.length; i++) {
                                                const tag = task.tags[i]
                                                connection.query("SELECT idEtiqueta FROM aw_tareas_etiquetas WHERE texto = ?",
                                                [task.tags[i]],
                                                function(e, rows) {
                                                    if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                    else{
                                                        // Crear Etiqueta
                                                        if (rows.length === 0){
                                                            connection.query("INSERT INTO aw_tareas_etiquetas (texto) VALUES (?)",
                                                            [tag],
                                                            function(e, result) {
                                                                if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                                else {
                                                                    // Asignar Etiqueta a Tarea
                                                                    connection.query("INSERT INTO aw_tareas_tareas_etiquetas (idTarea, idEtiqueta) VALUES (?, ?)",
                                                                    [idTarea, result.insertId],
                                                                    function(e, result) {
                                                                        if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                                    })
                                                                }
                                                            })
                                                        }
                                                        // Etiqueta ya existe
                                                        else {
                                                            // Asignar Etiqueta a Tarea
                                                            connection.query("INSERT INTO aw_tareas_tareas_etiquetas (idTarea, idEtiqueta) VALUES (?, ?)",
                                                            [idTarea, rows[0].idEtiqueta],
                                                            function(e, result) {
                                                                if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                            connection.release()
                                            callback(null)
                                        }
                                    })
                                }
                            })
                        }
                        // Tarea no existe
                        else {
                            // Crear Tarea
                            connection.query("INSERT INTO aw_tareas_tareas (texto) values(?)",
                            [task.text],
                            function(e, result) {
                                if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                else {
                                    idTarea = result.insertId

                                    // Buscar Usuario
                                    connection.query("SELECT idUser FROM aw_tareas_usuarios WHERE email = ?",
                                    [email],
                                    function(e, rows) {
                                        if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                        else {
                                            idUsuario = rows[0].idUser
                                            
                                            // Asignar Tarea y Usuario
                                            connection.query("INSERT INTO aw_tareas_user_tareas (idTarea, idUser, hecho) VALUES (?, ?, ?)",
                                            [idTarea, idUsuario, task.done],
                                            function(e, result) {
                                                if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                else {
                                                    // Buscar Etiquetas
                                                    for(var i = 0; i < task.tags.length; i++) {
                                                        const tag = task.tags[i]
                                                        connection.query("SELECT idEtiqueta FROM aw_tareas_etiquetas WHERE texto = ?",
                                                        [task.tags[i]],
                                                        function(e, rows) {
                                                            if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                            else{
                                                                // Crear Etiqueta
                                                                if (rows.length === 0){
                                                                    connection.query("INSERT INTO aw_tareas_etiquetas (texto) VALUES (?)",
                                                                    [tag],
                                                                    function(e, result) {
                                                                        if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                                        else {
                                                                            // Asignar Etiqueta a Tarea
                                                                            connection.query("INSERT INTO aw_tareas_tareas_etiquetas (idTarea, idEtiqueta) VALUES (?, ?)",
                                                                            [idTarea, result.insertId],
                                                                            function(e, result) {
                                                                                if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                                            })
                                                                        }
                                                                    })
                                                                }
                                                                // Etiqueta ya existe
                                                                else {
                                                                    // Asignar Etiqueta a Tarea
                                                                    connection.query("INSERT INTO aw_tareas_tareas_etiquetas (idTarea, idEtiqueta) VALUES (?, ?)",
                                                                    [idTarea, rows[0].idEtiqueta],
                                                                    function(e, result) {
                                                                        if (e) callback(utils.DB_ACCESS_ERROR_MESSAGE)
                                                                    })
                                                                }
                                                            }
                                                        })
                                                    }
                                                    connection.release()
                                                    callback(null)
                                                }
                                            })
                                        }
                                    })

                                }
                            })
                        }
                    }
                })
            }
        })
    }

    intertAviso(idUsuario,aviso,callback){ //aviso contiene  {tipo, fecha, texto}. no es necesario insertar el id
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                
                connection.query("INSERT INTO UCM_AW_CAU_AVI_Avisos(idUsuario, tipo, fecha, texto) ",[idUsuario,aviso.tipo, aviso.fecha, aviso.texto],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else callback(null)
                });
                
            }
        });
    }

    añadirComentario(){ //aquí el técnico se dispone a hacerle el comentario.
        
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                
                connection.query("INSERT INTO UCM_AW_CAU_AVI_Avisos(idUsuario, tipo, fecha, texto) ",[idUsuario,aviso.tipo, aviso.fecha, aviso.texto],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else callback(null)
                });
                
            }
        });
    }

    deleteAviso(idAviso,callback){
        this.pool.getConnection(function(e,connection){
            if(e){
                callback(utils.DB_CONNECTION_ERROR_MESSAGE)
            }
            else{
                
                connection.query("DELETE FROM UCM_AW_CAU_AVI_Avisos WHERE idAviso = ?",[idAviso],
                function(e, rows){
                    connection.release();
                    if(e) callback(utils.DB_ACCESS_ERROR_MESSAGE);
                    else callback(null,true)
                });
                
            }
        });
    }


}


module.exports = DAOMessages







