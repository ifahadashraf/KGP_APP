var membersCounter = 1;
var users = [];

var tableMy = $('#checklistsTable').DataTable({
    "order": [[0, "asc"]],
    "pageLength": 10
});

(function () {
    getUsers();
    getGroups();
    $('#mdModal').on('hide.bs.modal', function () {
        $('.gp-users').html('');
        $('#sltUsers1 option[value=-1]').prop('selected', true);
        $('#txtGroupName').val('');
        $('#txtGroupId').val('');
        membersCounter = 1;
    })
})();

function getGroups() {
    getGroupsApi(function (data) {
        var arr = JSON.parse(data);
        $.each(arr, function (index, item) {
            tableMy.row.add([
                            item.GroupId,
                            item.GroupName,
                            item.Created,
                            (item.GroupStatus == true) ? 'Active' : 'Deactive',
                            '<button class="btn btn-default" onclick="getMembers(' + item.GroupId + ',\''+item.GroupName+'\')">View Members</button>'
            ]).draw();
        });
    });
}

function getUsers() {
    getUsersApi(function (data) {
        var arr = JSON.parse(data);

        if (arr.length > 0) {
            $.each(arr, function (index, item) {
                if (item.Userusername) {
                    users.push(item);
                    $('#sltUsers1').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                }
            });
        }
    });
}

function getMembers(id, gpn) {
    getMembersApi(id, function (data) {
        var arr = JSON.parse(data);
        if (arr) {
            $.each(arr, function (ix, item) {
                $('#sltUsers' + membersCounter + ' option[value=' + item.UserID + ']').prop('selected', true);
                addNewRow();
                //$('#membersTable').append(
                //    '<tr><td>' + item.UserID + '</td><td>' + item.UserName + '</td></tr>'
                //);
            });
        }

        $('#txtGroupId').val(id);
        $('#txtGroupName').val(gpn);
        $('#mdModal').modal('show');
    });
}

function addNewRow() {
    membersCounter += 1;
    var html = '<div id="'+membersCounter+'" class="row">'+
                    '<div class="col-lg-10">'+
                        '<div class="form-group">'+
                            '<label></label>'+
                            '<select id="sltUsers'+membersCounter+'" class="form-control">'+
                                '<option value="-1">Select user</option>';
    $.each(users, function (index, item) {
       html += '<option value="' + item.UserID + '">' + item.UserName + '</option>';
    });

    html += '</select>' +
            '</div>' +
            '</div>' +
            '<div class="col-lg-2">' +
                '<div class="form-group">' +
                    '<label></label>' +
                    '<button class="btn btn-primary" onclick="removeNewRow('+membersCounter+')" style="margin-top: 25px;">X</button>' +
                '</div>' +
            '</div>' +
            '</div>';
    $('.gp-users').append(html);
}

function removeNewRow(id) {
    $('#' + id).remove();
    membersCounter -= 1;
}

function submitGroup() {
    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait...</strong></div>');
    var groupName = $('#txtGroupName').val();
    var usersList = [];
    for (var i = 1; i <= membersCounter; i++) {
        if ($('#sltUsers' + i).val())
            if ($('#sltUsers' + i).val() != '-1')
                usersList.push($('#sltUsers' + i).val());
    }

    var json = null;
    if ($('#txtGroupId').val() != '') {
        json = {
            'GroupId': $('#txtGroupId').val(),
            'GroupName': groupName,
            'Users': usersList
        }
    }
    else {
        json = {
            'GroupId': -1,
            'GroupName': groupName,
            'Users': usersList
        }
    }

    submitGroupsApi(json, function (data) {
        if (data == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong></div>')
            setTimeout(function () {

                window.location.href = window.location.href;

            }, 1500);
        }
        else {
            alert(data);
        }

    });
}