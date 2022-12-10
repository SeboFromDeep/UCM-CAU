function updateGroupOptions(options, type){
    const groupSelect = document.querySelector('#group')
    const subgroupSelect = document.querySelector('#subgroup')
    const isSugerencia = type === 'Sugerencia'
    
    $('#group').empty()
    $('#subgroup').empty()

    if(type === 'Sugerencia' || type === 'Incidencia') type = 'Sugerencia/Incidencia'
    
    let selected 
    let i = 0
    for (group in options[type]) {
        if (i === 0 ) selected = group
        groupSelect.innerHTML += '<option value="' + group + '">' + group + '</option'
        i += 1
    }
    for(subgroup in options[type][selected]) {
        subgroupSelect.innerHTML += '<option value="' + options[type][selected][subgroup] + '">' + options[type][selected][subgroup] + '</option'
    }

    $('.modal-select-container').toggleClass('invisible', !isSugerencia)

}

function updateSubgroupOptions(options, type, group) {
    const subgroupSelect = document.querySelector('#subgroup')

    $('#subgroup').empty()

    if(type === 'Sugerencia' || type === 'Incidencia') type = 'Sugerencia/Incidencia'


    for(subgroup in options[type][group]) {
        subgroupSelect.innerHTML += '<option value="' + options[type][group][subgroup] + '">' + options[type][group][subgroup] + '</option'
    }
}

$(document).ready(function() {
    const openButton = document.querySelector('#open-modal-create')
    const closeButton = document.querySelector('#close-modal-create')
    const typeSelect = document.querySelector('#type')
    const groupSelect = document.querySelector('#group')


    openButton.addEventListener('click', (event) => {
        $.ajax({
            method: 'GET',
            url: '/messages/message-options',
            success: function(data) {
                options = data
                $('#create-modal').toggle()
            }
        })
    })

    closeButton.addEventListener('click', (event) => {
        $('#create-modal').toggle()
    })

    typeSelect.addEventListener('change', (event) => {
        updateGroupOptions(options, typeSelect.value)
    })

    groupSelect.addEventListener('change', (event) => {
        updateSubgroupOptions(options, typeSelect.value, groupSelect.value)
    })


})
