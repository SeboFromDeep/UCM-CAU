    const form = document.querySelector("#assign-form")
    const select = document.querySelector("#technician")
    const assignIcons = document.querySelectorAll(".assign-message")

    assignIcons.forEach((icon, i) => {
        icon.addEventListener('click', (event) => {
            getAllTechnicians()
            openAssignModal(i)
        })
    })
    function openAssignModal(index) {
        console.log()
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
    
    function closeModal() {
        $('#assign-modal').toggle()
    }

    function getAllTechnicians() {
        if (!$("#technician").val()) {
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
  