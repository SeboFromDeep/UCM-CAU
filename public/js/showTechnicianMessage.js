const finishIcons = document.querySelectorAll(".finish-message")
const deleteIcons = document.querySelectorAll(".delete-message")
const seeIcons = document.querySelectorAll(".see-message")
const closeIcon = document.querySelector("#adviceModal .modal-close")

finishIcons.forEach((icon, i) => {
    icon.addEventListener('click', (event) => {
      finishMessage(i)
    })
})

deleteIcons.forEach((icon, i) => {
    icon.addEventListener('click', (event) => {
      deleteMessage(i)
    })
})

seeIcons.forEach((icon, i) => {
  icon.addEventListener('click', (event) => {
    seeMessage(i)
  })
})

function finishMessage(index) {
    openModal(index, "/messages/finish-message/", "Terminar Aviso")
}

function deleteMessage(index) {
  openModal(index, "/messages/delete-message/", "Borrar Aviso")
}

function seeMessage(index) {
  $('#modal-username')[0].innerText = messages[index].usuario
  $('#modal-type')[0].innerText = "Aviso " + messages[index].id + ": " + messages[index].tipo + " " + messages[index].estado
  $('#modal-date')[0].innerText = messages[index].fecha
  if (messages[index].subgrupo !== null){
    $('#modal-group')[0].innerText = messages[index].grupo + ": "
    $('#modal-subgroup')[0].innerText = messages[index].subgrupo
  } 
  else {
    $('#modal-group')[0].innerText = messages[index].grupo
    $('#modal-subgroup')[0].innerText = ""
  }
  $('#modal-observations')[0].innerText = messages[index].texto
  $('#comments')[0].innerText = messages[index].comentarios

  $('#adviceModal').toggle()
}

closeIcon.addEventListener('click', (event) => {
  $('#adviceModal').toggle()
}) 

function openModal(index, action, buttonText) {
  $('#modal-username')[0].innerText = messages[index].usuario
  $('#modal-type')[0].innerText = "Aviso " + messages[index].id + ": " + messages[index].tipo + " " + messages[index].estado
  $('#modal-date')[0].innerText = messages[index].fecha
  if (messages[index].subgrupo !== null){
    $('#modal-group')[0].innerText = messages[index].grupo + ": "
    $('#modal-subgroup')[0].innerText = messages[index].subgrupo
  } 
  else {
    $('#modal-group')[0].innerText = messages[index].grupo
    $('#modal-subgroup')[0].innerText = ""
  }
  $('#modal-observations')[0].innerText = messages[index].texto
  $('#technician-comments').attr("action", action + messages[index].id)
  $('#comments').val("")
  $('.modal-action')[0].innerText = buttonText

  $('#adviceModal').toggle()
}

function closeModal() {
  $('#adviceModal').toggle()
}