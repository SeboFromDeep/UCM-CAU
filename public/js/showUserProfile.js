const userImage = document.querySelector(".user-image")
const closeButton = document.querySelector("#profile-modal .modal-close")

userImage.addEventListener("click", (event) => {
    $.ajax({
        method: 'GET',
        url: '/users/user-messages-info',
        success: function(data) {
            info = JSON.parse(data)
            addMessagesInfo(info)
        }
    })
    $('#profile-modal').toggle()
})

closeButton.addEventListener("click", (event) => {
    $('#profile-modal').toggle()
})

function addMessagesInfo(info) {
    $('#total-messages-count')[0].innerText = info['Total'] ? info['Total'] : 0
    $('#incidencias-count')[0].innerText = info['Incidencia'] ? info['Incidencia'] : 0
    $('#sugerencias-count')[0].innerText = info['Sugerencia'] ? info['Sugerencia'] : 0
    $('#felicitaciones-count')[0].innerText = info['Felicitacion'] ? info['Felicitacion'] : 0
}