"use strict"

const mysql = require("mysql");
const DAOUsers = require("./DAOUsers");
const DAOMessages = require("./DAOMessages");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "practica_obligatoria"
});

let daoUser = new DAOUsers(pool);
let daoMessages = new DAOMessages(pool);

// Definición de las funciones callback

function isUserCorrectCallback(error, isCorrect) {
    if (error) console.error(error.message)
    else console.log(isCorrect)
}

function getUserImageNameCallback(error, img) {
    if (error) console.error(error.message)
    else console.log(img)
}

function insertTaskCallback(error, inserted){
    if(error) console.error(error.message)
    else console.log("Tarea añadida con éxito")
}
function getAllTasksCallback(error,tasks){
    if(error) console.error(error.message)
    else tasks.forEach(task => {
        console.log(task)
    });
}
function markTaskDoneCallback(error){
    if(error) console.error(error.message)
    else console.log("Tarea marcada como acabada") 
}
function deleteCompletedCallback(error){
    if (error) console.error(error.message)
    else console.log("Tareas completadas eliminadas")
}

// Uso de los métodos de las clases DAOUsers
daoUser.isUserCorrect("aitor.tilla@ucm.es", "aitor", isUserCorrectCallback)
daoUser.isUserCorrect("aitor.tilla@ucm.es", "aitor1", isUserCorrectCallback)
daoUser.isUserCorrect("aitor.tilla@gmail.com", "aitor", isUserCorrectCallback)

daoUser.getUserImageName("aitor.tilla@ucm.es", getUserImageNameCallback)
daoUser.getUserImageName("aitor.tilla@gmail.com", getUserImageNameCallback)

// Uso de los métodos de las clases DAOTasks
daoTask.getAllTasks("aitor.tilla@ucm.es",getAllTasksCallback)

daoTask.insertTask("aitor.tilla@ucm.es",{text:"tarea de prueba",done: 0, tags:["AW","prueba"]}, insertTaskCallback)

daoTask.markTaskDone(4, markTaskDoneCallback)

daoTask.deleteCompleted("aitor.tilla@ucm.es", deleteCompletedCallback)