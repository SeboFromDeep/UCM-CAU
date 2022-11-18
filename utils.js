function toggleCheckbox() {
    const checkbox = document.querySelector("#is-technician")   
    if (checkbox.checked) document.getElementById("employee-id").className = "signup-input employee-id"
    else document.getElementById("employee-id").className = "signup-input employee-id invisible"
}