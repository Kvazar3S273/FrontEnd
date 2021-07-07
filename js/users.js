window.onload = function () {
    const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/;
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    var number = 1;
    var txtLastName = document.getElementById("txtLastName");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtEmail = document.getElementById("txtEmail");
    var btnAddNewUser = document.getElementById("btnAddNewUser");
    var btnAddUserSave = document.getElementById("btnAddUserSave");
    var tbodyUsers = document.getElementById("tbodyUsers");
    var fileImage = document.getElementById("fileImage");
    var imgPhoto = document.getElementById("imgPhoto");
    var selectImageBase64 = document.getElementById("selectImageBase64");


    fileImage.onchange = function (e) {
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        }
        else if (e.target) {
            files = e.target.files;
        }
        if (files && files[0]) {
            const file = files[0];
            //console.log(file.type);

            if (file.type.match(/^image\//)) {
                const file_name = file.name;
                const reader = new FileReader();
                reader.onload = function () {
                    imgPhoto.src = reader.result;
                    selectImageBase64.value = reader.result;
                    showSuccess(fileImage);
                }
                reader.readAsDataURL(file);
            }
            else {
                alert("Wrong file format!");
            }
        }
        else {
            alert("Будь ласка, виберіть файл");
        }
    };

    IMask(
        txtPhone, {
        mask: '+00(000) 000 00 00'
    });


    btnAddNewUser.onclick = function (e) {
        imgPhoto.src = "images/no-image.jpg";
        $("#myModal").modal("show");
    };

    txtLastName.oninput = isValidTextInput;
    txtName.oninput = isValidTextInput;
    txtEmail.oninput = isValidEmailInput;
    txtPhone.oninput = isValidPhoneInput;


    btnAddUserSave.onclick = function (e) {
        if (isValidation()) {
            var lastName = txtLastName.value;
            var name = txtName.value;
            var phone = txtPhone.value;
            var email = txtEmail.value;
            var photo = document.createElement('img');
            photo.style.height = '70px';
            photo.style.padding = '3px';
            photo.style.border = '1px solid white';
            photo.style.margin = '0px auto 0px auto';
            photo.style.display = '0px auto 0px auto';
            photo.src = selectImageBase64.value;//imgPhoto.src;
            var tr = document.createElement("tr");
            tr.innerHTML = `<th scope="row">${number++}</th>
                            <td>${lastName}</td>
                            <td>${name}</td>
                            <td>${phone}</td>
                            <td>${email}</td>
                            <td>
                                <i class="fa fa-pencil text-info cursor-pointer" 
                                    aria-hidden="true"
                                    onclick="EditRow(this)"></i>
                                <i class="fa fa-times text-danger cursor-pointer" 
                                    aria-hidden="true" 
                                    onclick="DeleteRow(this)"></i>
                            </td>`;
            tr.appendChild(photo);
            txtLastName.value = txtName.value = txtPhone.value = txtEmail.value = "";
            $("#myModal").modal("hide");
            tbodyUsers.appendChild(tr);
        }
    };

    function isValidTextInput(e) {
        if (e.target.value == "") {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }

    function isValidEmailInput(e) {
        if (!regex_email.test(e.target.value)) {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }

    function isValidPhoneInput(e) {
        if (!regex_phone.test(e.target.value)) {
            showError(e.target);
        }
        else {
            showSuccess(e.target);
        }
    }

    function isValidation() {
        var isValid = true;
        if (txtLastName.value == "") {
            showError(txtLastName);
            isValid = false;
        }
        else {
            showSuccess(txtLastName);
        }

        if (txtName.value == "") {
            showError(txtName);
            isValid = false;
        }
        else {
            showSuccess(txtName);
        }

        if (!regex_email.test(txtEmail.value)) {
            showError(txtEmail);
            isValid = false;
        }
        else {
            showSuccess(txtEmail);
        }

        if (!regex_phone.test(txtPhone.value)) {
            showError(txtPhone);
            isValid = false;
        }
        else {
            showSuccess(txtPhone);
        }

        if (selectImageBase64.value == "") {
            showError(fileImage);
            isValid = false;
        }
        else {
            showSuccess(fileImage);
        }

        return isValid;
    }

    function showError(input) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
    function showSuccess(input) {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
}

function DeleteRow(e) {
    var tbodyUsers = document.getElementById('tbodyUsers');
    bootbox.confirm("Ви точно хочете видалити об'єкт?", function (result) {
        if (result) {
            tbodyUsers.removeChild(e.parentElement.parentElement);
        }
    });
}

function EditRow(e) {
    //e.preventDefault();
    $("#editModal").modal("show");
    var tr = e.parentElement.parentElement;
    //var tr = $(this).closest("tr");
    //console.log(tr);

    var valueLastName = tr.cell[3].innerHTML;
    var valueName = tr.cell[1].innerHTML;
    var valuePhone = tr.cell[2].innerHTML;
    var valueMail = tr.cell[4].innerHTML;

    document.getElementsByClassName('txtLastname')[0].value = valueLastName;
    document.getElementsByClassName('txtName')[0].value = valueName;
    document.getElementsByClassName('txtPhone')[0].value = valuePhone;
    document.getElementsByClassName('txtEmail')[0].value = valueMail;

    alert(valueName);

    //tr.cells.item(1).innerHTML = txtName.value;
    //tr.cells.item(2).innerHTML = txtLastname.value;
    //tr.cells.item(3).innerHTML = txtPhone.value;
    //tr.cells.item(4).innerHTML = txtEmail.value;


    //var txtEditLastName = tr.cell[1].innerHTML;
    //var txtEditName = tr.cell[2].innerHTML;
    //var txtEditPhone = tr.cell[3].innerHTML;
    //var txtEditEmail = tr.cell[4].innerHTML;
    //var txtEditImage = tr.cell[1].innerHTML;

    //console.log(tr);


    //var valueLastName = tr.cell[1].innerHTML;
    //var valueName = tr.cell[2].innerHTML;
    //var valuePhone = tr.cell[3].innerHTML;
    //var valueEmail = tr.cell[4].innerHTML;
    //document.getElementById("txtLastName")[0].value = valueLastName;
    //document.getElementById("txtName")[0].value = valueName;
    //document.getElementById("txtPhone")[0].value = valuePhone;
    //document.getElementById("txtEmail")[0].value = valueEmail;

    //var a = tbodyUsers.getElementsByClassName(e.parentElement.parentElement);
    //alert(a);
    
}




//function EditRow1(tr) {
//    var mainForm = document.getElementById('mainForm');
//    var txtName = document.getElementById("txtName");
//    var txtPhone = document.getElementById("txtPhone");
//    var txtLastname = document.getElementById("txtLastname");
//    var txtMail = document.getElementById("txtMail");

//    if (mainForm.checkValidity() === true) {
//        tr.cells.item(1).innerHTML = txtName.value;
//        tr.cells.item(2).innerHTML = txtLastname.value;
//        tr.cells.item(3).innerHTML = txtPhone.value;
//        tr.cells.item(4).innerHTML = txtMail.value;
//        $('#editModal').modal('hide');
//        txtName.value = txtPhone.value = txtLastname.value = txtMail.value = "";
//    }
//}