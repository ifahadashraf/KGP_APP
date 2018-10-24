﻿$(document).ready(function () {
    getUsers();
    getRoles();
    $('#mdModal').on('hidden.bs.modal', function () {
        // do something…
        var val = $('#btnAddModal').html('Add');
        $('#txtRoleName').val('');
        var i = 0;
        for (var i = 0; i <= 11; i++) {
            $("#checkbox_" + i).prop('checked', true);
        }
        $('#txtRoleName').prop('disabled', false);
        $('#mdModal').modal('hide');
    })
});

var rolesArr = [];

var id_forEdit = -1;

function onClickbtnAddModal() {
    var val = $('#btnAddModal').text();

    if (val == "Add") {
        addNewRole();
    }
    else if(val == "Update") {
        updateRole();
    }
}

function onClickbtnCloseModal() {
    var val = $('#btnAddModal').html('Add');
    $('#txtRoleName').val('');
    var i = 0;
    for (var i = 0; i <= 11; i++) {
        $("#checkbox_" + i).prop('checked', true);
    }
    $('#txtRoleName').prop('disabled', false);
    $('#mdModal').modal('hide');
}

function editModal(it) {
    var item = rolesArr[it];
    var body = {
        "isMNVehicles": false,
        "isMNStaff": false,
        "isMNDeliverySites": false,
        "isHVehicleChecklist": false,
        "isHSalePurchase": false,
        "isHAttendance": false,
        "isHMaintenance": false,
        "isHTaskMng": false,
        "isHRent": false,
        "isHPettyCash": false,
        "isHCash": false,
        "isHpayments": false
    }
    var i = 0;
    for (var key in body) {
        $("#checkbox_" + i).prop('checked',item[key]);
        i++;
    }

    $('#txtRoleName').val(item["RoleName"]);
    $('#txtRoleName').prop('disabled', true);
    $('#btnAddModal').html('Update');
    id_forEdit = item['RoleID'];
    $('#mdModal').modal('show');

}

function getUsers() {

    getUsersApi(function (data) {

        var arr = JSON.parse(data);

        if (arr.length > 0) {
            $('#sltUsers').html('');
            $.each(arr, function (index, item) {
                $('#sltUsers').append('<option value="'+item.UserID+'">'+item.UserName+'</option>');
            });
        }
    });
}

function getRoles() {

    var table = $('#rolesTable').DataTable();
    table.clear();
    rolesArr = [];

    getRolesApi(function (data) {

        var arr = JSON.parse(data);

        if (arr.length > 0) {
            $('#sltRoles').html('');
            $.each(arr, function (index, item) {
                delete item["Users"];
                rolesArr.push(item);
                $('#sltRoles').append('<option value="' + item.RoleID + '">' + item.RoleName + '</option>');

                table.row.add([
                    index + 1,
                    item.RoleName,
                    '<button type="button" class="btn bg-light-blue waves-effect" onclick="editModal('+index+')">Edit</button><button type="button" class="btn bg-light-blue waves-effect">Delete</button>'
                ]).draw();
            });
        }
    });
}


function addNewRole() {

    if ($('#txtRoleName').val() == '') {
        alert("Please enter a role name.");
        return;
    }

    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait !</strong> working on your request</div>')
    var body = {
        "isMNVehicles" : false,
        "isMNStaff" : false,
        "isMNDeliverySites" : false,
        "isHVehicleChecklist" : false,
        "isHSalePurchase" : false,
        "isHAttendance" : false,
        "isHMaintenance" : false,
        "isHTaskMng" : false,
        "isHRent" : false,
        "isHPettyCash" : false,
        "isHCash" : false,
        "isHpayments" : false
    }
    var i = 0;
    for (var key in body) {
        var status = $("#checkbox_" + i).prop("checked");
        body[key] = status;
        i++;
    }
    body["RoleName"] = $('#txtRoleName').val();

    addNewRoleApi(body, function (data) {
        $('#alertdiv').html('');
        if (data == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> New role has been added</div>')
            setTimeout(function () {
                $('#alertdiv').html('');
            }, 1500);
        }
        else {
            $('#alertdiv').html('<div class="alert alert-danger"><strong>Error !</strong>'+data+'</div>')
        }
    });
}

function assignRole() {

    $('#alertdiv1').html('<div class="alert alert-info"><strong>Please wait !</strong> working on your request</div>');

    var userId = $('#sltUsers').val();
    var roleId = $('#sltRoles').val();

    assignRoleApi(userId, roleId, function (data) {
        $('#alertdiv1').html('');
        if (data == "1") {
            $('#alertdiv1').html('<div class="alert alert-success"><strong>Success !</strong> New role has been added</div>')
            setTimeout(function () {
                $('#alertdiv1').html('');
            }, 1500);
        }
        else {
            $('#alertdiv1').html('<div class="alert alert-danger"><strong>Error !</strong>' + data + '</div>')
        }
    })
}

function updateRole() {
    
    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait !</strong> working on your request</div>')
    var body = {
        "isMNVehicles": false,
        "isMNStaff": false,
        "isMNDeliverySites": false,
        "isHVehicleChecklist": false,
        "isHSalePurchase": false,
        "isHAttendance": false,
        "isHMaintenance": false,
        "isHTaskMng": false,
        "isHRent": false,
        "isHPettyCash": false,
        "isHCash": false,
        "isHpayments": false
    }
    var i = 0;
    for (var key in body) {
        var status = $("#checkbox_" + i).prop("checked");
        body[key] = status;
        i++;
    }
    body["RoleName"] = $('#txtRoleName').val();
    body["RoleID"] = id_forEdit;

    updateRoleApi(body, function (data) {
        $('#alertdiv').html('');
        if (data == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> New role has been added</div>')
            setTimeout(function () {
                getRoles();
                $('#alertdiv').html('');
                onClickbtnCloseModal();

            }, 1500);
        }
        else {
            $('#alertdiv').html('<div class="alert alert-danger"><strong>Error !</strong>' + data + '</div>')
        }
    });
}