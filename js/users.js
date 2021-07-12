	var hNumber = document.getElementById("hNumber");
    var txtLastName = document.getElementById("txtLastName");
    var txtName = document.getElementById("txtName");
    var txtPhone = document.getElementById("txtPhone");
    var txtEmail = document.getElementById("txtEmail");
    var imgPhoto = document.getElementById("imgPhoto");

window.onload = function () {
	
    const regex_phone = /^(?=\+?([0-9]{2})\(?([0-9]{3})\)\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})).{18}$/;
    const regex_email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    var number = 0;

    var btnAddNewUser = document.getElementById("btnAddNewUser");
    var btnAddUserSave = document.getElementById("btnAddUserSave");
    var tbodyUsers = document.getElementById("tbodyUsers");
    var fileImage = document.getElementById("fileImage");
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
        // Очищаємо поля форми перед показом модального вікна, бо ми створюємо новий запис, так само очищаємо поле hNumber
        hNumber.value = txtLastName.value = txtName.value = txtPhone.value = txtEmail.value = fileImage.value = "";
        imgPhoto.src = "images/no-image.jpg";
        $("#myModal").modal("show");
    };

    txtLastName.oninput = isValidTextInput;
    txtName.oninput = isValidTextInput;
    txtEmail.oninput = isValidEmailInput;
    txtPhone.oninput = isValidPhoneInput;


    btnAddUserSave.onclick = function (e) {
        if (isValidation()) {
			var rowNumber = hNumber.value;
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
            photo.src = selectImageBase64.value;
			// оголошуємо змінну для рядка:
            // - при створенні нового запису ми будемо додавати новий рядок
            // - при редагуванні існуючого запису - ми будемо замінювати уже існуючимй рядок
            var tr = null;
			 if (!rowNumber) { // якщо номер запису пустий - створюємо новий рядок, генеруємо для нього номер, додаємо рядок до таблиці
                fileImage.value = "";
                rowNumber = ++number;
			    tr = document.createElement("tr");
				tbodyUsers.appendChild(tr);
				$(tr).attr('number', rowNumber);		// заповнюємо для рядка атрибут number, щоб потім його можна було знайти по номеру
			 }
			 else { // якщо номер заповнений - редагування існуючого запису, шукаємо рядок із вказаним номером
				
				tr = $(tbodyUsers).find(`tr[number=${rowNumber}]`).get(0);
            }
				tr.innerHTML = `<th scope="row">${rowNumber}</th>
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
            $("#myModal").modal("hide");
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
    $("#myModal").modal("show");
    var tr = e.parentElement.parentElement;

    // Витягуємо дані із рядка таблиці що редагується
    var valueNumber = $(tr).find('th').get(0).innerHTML;
    var valueLastName = $(tr).find('td').get(0).innerHTML;
    var valueName = $(tr).find('td').get(1).innerHTML;
    var valuePhone = $(tr).find('td').get(2).innerHTML;
    var valueMail = $(tr).find('td').get(3).innerHTML;
    var photo = $(tr).find('img').get(0).src;

    // Заповнюємо поля модального вікна
    hNumber.value = valueNumber;
    txtLastName.value = valueLastName;
    txtName.value = valueName;
    txtPhone.value = valuePhone;
    txtEmail.value = valueMail;
    imgPhoto.src = photo;
}