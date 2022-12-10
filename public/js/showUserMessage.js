const tableRows = document.querySelectorAll(".table-row")
const close = document.querySelector('.modal-close') 

tableRows.forEach((row, i) => {
    row.addEventListener('click', (event) => {
        showMessage(i)
    })
})

close.addEventListener('click', (event) => {
  closeModal()
})

function showMessage(index) {
  $('#modal-type')[0].innerText = messages[index].tipo
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
  $('#show-modal').toggle()
}

function closeModal() {
  $('#show-modal').toggle()
}