$(document).ready(function () {
    getUsers();
});

var staffList = [];

function getUsers() {

    var table = $('#userTable').DataTable();

    getUsersApi(function (data) {

        var arr = JSON.parse(data);

        if (arr.length > 0) {
            $.each(arr, function (index, item) {
                staffList.push(item);
                table.row.add([
                    index + 1,
                    item.UserName,
                    item.Userusername,  
                    item.UserPhoneNumber,
                    item.UserCNIC,
                    item.UserType,
                    item.RoleName,
                    '<button type="button" class="btn bg-light-blue waves-effect" onclick="editStaff(' + item.UserID + ')">Edit</button> <button type="button" class="btn bg-light-blue waves-effect" onclick="deleteStaff(' + item.UserID + ')">Delete</button>'
                ]).draw();
            });
        }
    });
}

function addUser() {
    var fname = $('#txtFullName').val();
    var username = $('#txtUserusername').val();
    var pass = $('#txtPassword').val();
    var email = $('#txtEmail').val();
    var phone = $('#txtPhoneNumber').val();
    var cnic = $('#txtCNIC').val();
    var dob = $('#txtDOB').val();
    var gender = $('#txtGender').val();
    var type = $('#txtStaffType').val();
    var address = $('#txtAddress').val();

    var cnicRegex = new RegExp(/\d{5}-\d{7}-\d/);
    var emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    var phoneRegex = new RegExp(/(03[0-9][0-9])\-\d{7}/);

    if (fname == "") {
        alert("Full Name cannot be empty");
        return;
    }
    else if (email != "" && !emailRegex.test(email)) {
        alert("Email is not valid");
        return;
    }
    else if (phone != "" && !phoneRegex.test(phone)) {
        alert("Phone is not valid");
        return;
    }
    else if (cnic != "" && !cnicRegex.test(cnic)) {
        alert("CNIC is not valid");
        return;
    }
    else if (gender == "-1") {
        alert("Please select a gender");
        return;
    }
    else if (type == "-1") {
        alert("Please select a staff type");
        return;
    }

    var json = {
        "UserName": fname,
        "Userusername": username,
        "UserEmail": email,
        "UserPhoneNumber": phone,
        "UserCNIC": cnic,
        "UserDOB": dob,
        "UserGender": (gender == '1'),
        "UserType": type,
        "UserAddress": address,
        "UserStatus": true,
        "UserPassword": pass
    };

    addUserApi(json,function (data) {
        if (data == "1") {
            alert("Report submitted successfully !");
        }
        else {
            alert("Something went wrong. Contact Admin.");
        }
    });
}

function editStaff(userId) {
    var userToEdit = null;
    staffList.forEach(function (item) {
        if (item.UserID == userId) {
            userToEdit = item;
        }
    });

    $('#txtUserId').val(userToEdit.UserID);
    $('#txtUserusername1').val(userToEdit.Userusername);
    $('#txtPassword1').val(userToEdit.UserPassword);
    $('#txtFullName1').val(userToEdit.UserName);
    $('#txtEmail1').val(userToEdit.UserEmail);
    $('#txtPhoneNumber1').val(userToEdit.UserPhoneNumber);
    $('#txtCNIC1').val(userToEdit.UserCNIC);
    $('#txtDOB1').val((userToEdit.UserDOB == null) ? '' : userToEdit.UserDOB.split('T')[0]);
    $('#txtGender1').val((userToEdit.UserGender == true) ? '1' : '0');
    $('#txtStaffType1').val(userToEdit.UserType);
    $('#txtAddress1').val(userToEdit.UserAddress);

    $('#mdModal').modal('show');

}

function updateStaff() {
    var fname = $('#txtFullName1').val();
    var username = $('#txtUserusername1').val();
    var pass = $('#txtPassword1').val();
    var email = $('#txtEmail1').val();
    var phone = $('#txtPhoneNumber1').val();
    var cnic = $('#txtCNIC1').val();
    var dob = $('#txtDOB1').val();
    var gender = $('#txtGender1').val();
    var type = $('#txtStaffType1').val();
    var address = $('#txtAddress1').val();

    var json = {
        "UserID": $('#txtUserId').val(),
        "Userusername": username,
        "UserPassword": pass,
        "UserName": fname,
        "UserEmail": email,
        "UserPhoneNumber": phone,
        "UserCNIC": cnic,
        "UserDOB": dob,
        "UserGender": (gender == '1'),
        "UserType": type,
        "UserAddress": address,
        "UserStatus": true
    };

    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait !</strong>...</div>')
    updateStaffApi(json, function (data) {
        if (data == 1) {
            if (data == "1") {
                $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> Staff has been updated</div>');
                setTimeout(function () {

                    window.location.href = window.location.href;

                }, 1500);
            }
            else {
                $('#alertdiv').html('<div class="alert alert-danger"><strong>Error !</strong> Something went wrong. Try again later</div>');
                setTimeout(function () {

                    $('#alertdiv').html('');

                }, 1500);
            }
        }
    });

    console.log(json);
}

function deleteStaff(id) {
    swal({
        title: "Are you sure ?",
        text: "This will delete this user from system",
        type: "info",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
    }, function () {
        deleteUserApi(id, function (data) {
            if (data == "1") {
                swal({
                    title: "Success",
                    text: "User deleted",
                    type: "success",
                    confirmButtonText: "Ok"
                }, function (isConfirm) {
                    if (isConfirm) {
                        window.location.href = window.location.href;
                    }
                });
            }
            else {
                swal("Error", data, "error");
            }
        });
    });
}