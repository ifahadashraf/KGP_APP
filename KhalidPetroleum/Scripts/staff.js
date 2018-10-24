$(document).ready(function () {
    getUsers();
});

function getUsers() {

    var table = $('#userTable').DataTable();

    getUsersApi(function (data) {

        var arr = JSON.parse(data);

        if (arr.length > 0) {
            $.each(arr, function (index, item) {
                table.row.add([
                    index + 1,
                    item.UserName,
                    item.UserEmail,
                    item.UserPhoneNumber,
                    item.UserCNIC,
                    ((item.UserDOB == null) ? '' : item.UserDOB.split('T')[0]),
                    ((item.UserGender == true) ? 'MALE' : 'FEMALE'),
                    item.UserType,
                    item.RoleName,
                    '<button type="button" class="btn bg-light-blue waves-effect">Edit</button>'
                ]).draw();
            });
        }
    });
}

function addUser() {
    var fname = $('#txtFirstName').val(); 
    var lname = $('#txtLastName').val(); 
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

    if (fname == "" || lname == "") {
        alert("First/Last Name cannot be empty");
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
        "UserName": fname + ' ' + lname,
        "UserEmail": email,
        "UserPhoneNumber": phone,
        "UserCNIC": cnic,
        "UserDOB": dob,
        "UserGender": (gender == '1'),
        "UserType": type,
        "UserAddress": address,
        "UserStatus":true
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