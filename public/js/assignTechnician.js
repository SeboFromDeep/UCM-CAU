    const form = document.querySelector("#assign-form")
    const select = document.querySelector("#technician")
    const assignIcons = document.querySelectorAll(".assign-message")
    const deleteIcons = document.querySelectorAll(".delete-message")

    assignIcons.forEach((icon, i) => {
        icon.addEventListener('click', (event) => {
            getAllTechnicians()
            openAssignModal(i)
        })
    })

    deleteIcons.forEach((icon, i) => {
        icon.addEventListener('click', (event) => {
            openDeleteModal(i)
        })
    })

    
    function openAssignModal(index) {
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
        $('#assign-form').attr("action", "/messages/assign-message/" + messages[index].id )
        
        $('#assign-modal').toggle()
    }

    function openDeleteModal(index) {
        $('[id=modal-username]')[1].innerText = messages[index].usuario
        $('[id=modal-type]')[1].innerText = "Aviso " + messages[index].id + ": " + messages[index].tipo + " " + messages[index].estado
        $('[id=modal-date]')[1].innerText = messages[index].fecha
        if (messages[index].subgrupo !== null){
            $('[id=modal-group]')[1].innerText = messages[index].grupo + ": "
            $('[id=modal-subgroup]')[1].innerText = messages[index].subgrupo
        } 
        else {
            $('[id=modal-group]')[1].innerText = messages[index].grupo
            $('[id=modal-subgroup]')[1].innerText = ""
        }
        $('[id=modal-observations]')[1].innerText = messages[index].texto
        $('[id=technician-comments]').attr("action", "/messages/delete-unassigned-message/" + messages[index].id)
        $('#comments').val("")
        $('.modal-action')[1].innerText = "Borrar aviso"
        
        $('#adviceModal').toggle()
    }
    
    function closeModal() {
        $('#assign-modal').toggle()
    }
    
    document.querySelectorAll("#adviceModal .modal-close")[0].addEventListener('click', (event) => {
        $('#adviceModal').toggle()
    }) 
    
    function getAllTechnicians() {
        if (select.length === 1) {
            $.ajax({
                method: 'GET',
                url: '/users/active-technicians',
                success: function(data) {
                    users = JSON.parse(data)
                    addTechnicians(users)
                }
            })
        }
    }

    function addTechnicians(users) {
        for (i in users) {
            select.innerHTML += '<option value="' + i + '">' + users[i] + '</option'
        }
    }
  