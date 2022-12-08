const search = document.querySelector('#search')
const searchIcon = document.querySelector('.search-icon')
const searchCheckbox = document.querySelector('#toggle')

function searchUserMessages() {
    if (search.value) {
        messages.forEach((message, i) => {
            const isVisible = message.texto.toLowerCase().includes(search.value.toLowerCase())
            document.querySelector('#row-' + i).classList.toggle('invisible', !isVisible)
        });
    }
    else {
        messages.forEach((message, i) => {
            document.querySelector('#row-' + i).classList.remove('invisible')
        });
    }
}

function searchTechnicianMessages() {
    if (search.value) {
        messages.forEach((message, i) => {
            const textContains = message.texto.toLowerCase().includes(search.value.toLowerCase())
            const userContains = message.usuario.toLowerCase().includes(search.value.toLowerCase())
            let isVisible = textContains
            if (searchCheckbox.checked) isVisible = isVisible || userContains
            document.querySelector('#row-' + i).classList.toggle('invisible', !isVisible)
        });
    }
    else {
        messages.forEach((message, i) => {
            document.querySelector('#row-' + i).classList.remove('invisible')
        });
    }
}

search.addEventListener('change', (event) => {
    if (!technician) searchUserMessages()
    else searchTechnicianMessages()
    
})

searchIcon.addEventListener('click', (event) => {
    if (!technician) searchUserMessages()
    else searchTechnicianMessages()
})
