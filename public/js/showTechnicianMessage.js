const eyeIcons = document.querySelectorAll(".eye-icon")
const trashIcons = document.querySelectorAll(".trash-icon")

eyeIcons.forEach((icon, i) => {
    icon.addEventListener('click', (event) => {
        finishMessage(i)
    })
})

trashIcons.forEach((icon, i) => {
    icon.addEventListener('click', (event) => {
        deleteMessage(i)
    })
})

function finishMessage(index) {
    openModal(index, "/messages/finish-message/", "Terminar Aviso")
  }

  function deleteMessage(index) {
    openModal(index, "/messages/delete-message/", "Borrar Aviso")
  }

  function openModal(index, action, buttonText) {
    $('#modal-username')[0].innerText = messages[index].usuario
    $('#modal-type')[0].innerText = "Aviso " + messages[index].id + ": " + messages[index].tipo
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