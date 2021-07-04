window.onload = function () {
    var txtLastName = document.getElementById("txtLastName");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtEmail = document.getElementById("txtEmail");
    var modalLastName = document.getElementById("modalLastName");
    var modalName = document.getElementById("modalName");
    var modalPhone = document.getElementById("modalPhone");
    var modalEmail = document.getElementById("modalEmail");
    var btnOk = document.getElementById("btnOk");

    btnOk.onclick = function (e) {
        modalLastName.innerHTML = txtLastName.value;
        modalName.innerHTML = txtName.value;
        modalPhone.innerHTML = txtPhone.value;
        modalEmail.innerHTML = txtEmail.value;
        $("#myModal").modal("show");
        e.preventDefault(); //Заборонити стандартну поведінку
$(":input").inputmask();
$("#phone").inputmask({ "mask": "(999) 999-9999" });
    };

}