var tableAll = $('#tasksTable').DataTable({
    "order": [[ 0, "desc" ]],
    "pageLength": 10,
    "rowCallback": function (row, data) {
        if (data[8] == "PENDING") {
            $('td:eq(8)', row).css('background-color', 'red');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "COMPLETED") {
            $('td:eq(8)', row).css('background-color', 'green');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "ON_APPROVAL") {
            $('td:eq(8)', row).css('background-color', 'orange');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "APPROVED") {
            $('td:eq(8)', row).css('background-color', 'limegreen');
            $('td:eq(8)', row).css('color', 'white');
        }
        else {
            $('td:eq(8)', row).css('background-color', 'yellow');
            $('td:eq(8)', row).css('color', 'black');
        }
    }
});

var tableMy = $('#my_tasks_tbl').DataTable({
    "order": [[0, "desc"]],
    "pageLength": 10,
    "rowCallback": function (row, data) {

        if (data[8] == "PENDING") {
            $('td:eq(8)', row).css('background-color', 'red');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "COMPLETED") {
            $('td:eq(8)', row).css('background-color', 'green');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "ON_APPROVAL") {
            $('td:eq(8)', row).css('background-color', 'orange');
            $('td:eq(8)', row).css('color', 'white');
        }
        else {
            $('td:eq(8)', row).css('background-color', 'yellow');
            $('td:eq(8)', row).css('color', 'black');
        }
    }
});

var tableMe = $('#assigned_by_me_tbl').DataTable({
    "order": [[0, "desc"]],
    "pageLength": 10,
    "rowCallback": function (row, data) {
        if (data[8] == "PENDING") {
            $('td:eq(8)', row).css('background-color', 'red');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "COMPLETED") {
            $('td:eq(8)', row).css('background-color', 'green');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "ON_APPROVAL") {
            $('td:eq(8)', row).css('background-color', 'orange');
            $('td:eq(8)', row).css('color', 'white');
        }
        else {
            $('td:eq(8)', row).css('background-color', 'yellow');
            $('td:eq(8)', row).css('color', 'black');
        }
    }
});

var readonlyTable = $('#readonlyTasksTable').DataTable({
    "order": [[0, "desc"]],
    "pageLength": 10,
    "rowCallback": function (row, data) {
        if (data[8] == "PENDING") {
            $('td:eq(8)', row).css('background-color', 'red');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "COMPLETED") {
            $('td:eq(8)', row).css('background-color', 'green');
            $('td:eq(8)', row).css('color', 'white');
        }
        else if (data[8] == "ON_APPROVAL") {
            $('td:eq(8)', row).css('background-color', 'orange');
            $('td:eq(8)', row).css('color', 'white');
        }
        else {
            $('td:eq(8)', row).css('background-color', 'yellow');
            $('td:eq(8)', row).css('color', 'black');
        }
    }
});

var usersTasksTable = $('#usersTasksTable').DataTable({
    "order": [[2, "desc"]],
    "pageLength": 10
});

var groupsTasksTable = $('#groupsTasksTable').DataTable({
    "order": [[2, "desc"]],
    "pageLength": 10
});

var tasks_list = [];
var users_name_list = [];
var users_id_list = [];

var userId = null;
var userType = null;

var myTasks_assignee = null;

var tasksList = [];
var tasksCounter = 1;

(function () {

    userId = $('#txtUserId').val();
    userType = $('#txtUserType').val();

    //if (userId == 3) {
    //    $('.nav-tabs li')[0].className = 'active';
    //    $('#user_tasks').addClass('active');
    //    $('#user_tasks').addClass('in');
    //}
    //else {
    //    $('.nav-tabs li')[1].className = 'active';
    //    $('#my_tasks').addClass('active');
    //    $('#my_tasks').addClass('in');
    //}

    getUserTasks();
    getGroupTasks();
    getUsers();
    getGroups();
    getTasks();

    $('#tasksTable').on('click', 'tbody tr', function () {

        var data_arr = tableAll.row(this).data();

        if (userId == 3)
            $('#divTaskOwner').css('display', 'initial');
        else
        {
            $('#divTaskOwner').css('display', 'none');
            $('#txtExpectedDate').prop('disabled', true);
        }
            

        $.each(tasks_list, function (index, item) {
            if(item.TaskId == parseInt(data_arr[0])){
                data_arr = item;
            }
        });

        $('#sltTaskOwner').val(users_id_list[users_name_list.indexOf(data_arr.OwnerName)]).change();
        $('#txtTaskId').val(data_arr.TaskId);
        $('#txtTaskName').val(data_arr.TaskName).prop('disabled', true);
        $('#txtStartDate').val(new Date(data_arr.StartDate).toISOString().split('T')[0]).prop('disabled',true);
        $('#txtExpectedDate').val(new Date(data_arr.EstimatedDate).toISOString().split('T')[0]);
        $('#sltAssignTo').val(data_arr.AssignedTo).change();
        $('#sltStatus').val(data_arr.TaskStatus).change();
        $('#txtDescription').val(data_arr.Details);

        $('#modalBtn').val('UPDATE');

        $('#mdModal').modal('show');

    });

    $('#my_tasks_tbl').on('click', 'tbody tr', function () {

        var data_arr = tableMy.row(this).data();

        if (userId == 3){
            $('#divTaskOwner').css('display', 'initial');
            $('#sltAssignTo').prop('disabled', false);
            $('#txtExpectedDate').prop('disabled', false);
        }
        else {
            $('#divTaskOwner').css('display', 'none');
            $('#sltAssignTo').prop('disabled', true);
            $('#txtExpectedDate').prop('disabled', true);
        }

        $.each(tasks_list, function (index, item) {
            if (item.TaskId == parseInt(data_arr[0])) {
                data_arr = item;
            }
        });

        $('#sltTaskOwner').val(users_id_list[users_name_list.indexOf(data_arr.OwnerName)]).change();
        $('#txtTaskId').val(data_arr.TaskId);
        $('#txtTaskName').val(data_arr.TaskName).prop('disabled', true);
        $('#txtStartDate').val(new Date(data_arr.StartDate).toISOString().split('T')[0]).prop('disabled', true);
        $('#txtExpectedDate').val(new Date(data_arr.EstimatedDate).toISOString().split('T')[0]);
        $('#sltAssignTo').val(data_arr.AssignedTo).change();
        myTasks_assignee = data_arr.AssignedTo;
        $('#sltStatus').val(data_arr.TaskStatus).change();
        $('#txtDescription').val(data_arr.Details);

        $('#modalBtn').val('UPDATE');

        $('#mdModal').modal('show');

    });

    $('#assigned_by_me_tbl').on('click', 'tbody tr', function () {

        var data_arr = tableMe.row(this).data();

        if (userId == 3){
            $('#divTaskOwner').css('display', 'initial');
            $('#txtExpectedDate').prop('disabled', false);
            $('#sltAssignTo').prop('disabled', false);
        }
        else {
            $('#sltAssignTo').prop('disabled', false);
            $('#divTaskOwner').css('display', 'none');
            $('#txtExpectedDate').prop('disabled', false);
        }

        $.each(tasks_list, function (index, item) {
            if (item.TaskId == parseInt(data_arr[0])) {
                data_arr = item;
            }
        });

        $('#sltTaskOwner').val(users_id_list[users_name_list.indexOf(data_arr.OwnerName)]).change();
        $('#txtTaskId').val(data_arr.TaskId);
        $('#txtTaskName').val(data_arr.TaskName).prop('disabled', true);
        $('#txtStartDate').val(new Date(data_arr.StartDate).toISOString().split('T')[0]).prop('disabled', true);
        $('#txtExpectedDate').val(new Date(data_arr.EstimatedDate).toISOString().split('T')[0]);
        $('#sltAssignTo').val(data_arr.AssignedTo).change();
        myTasks_assignee = data_arr.AssignedTo;
        $('#sltStatus').val(data_arr.TaskStatus).change();
        $('#txtDescription').val(data_arr.Details);

        $('#modalBtn').val('UPDATE');

        $('#mdModal').modal('show');

    });

    $('#readonlyTasksTable').on('click', 'tbody tr', function () {
        var data_arr = readonlyTable.row(this).data();

        if (userId == 3) {
            $('#divTaskOwner').css('display', 'initial');
            $('#sltAssignTo').prop('disabled', false);
            $('#txtExpectedDate').prop('disabled', false);
        }
        else {
            $('#divTaskOwner').css('display', 'none');
            $('#sltAssignTo').prop('disabled', true);
            $('#txtExpectedDate').prop('disabled', true);
        }

        $.each(tasks_list, function (index, item) {
            if (item.TaskId == parseInt(data_arr[0])) {
                data_arr = item;
            }
        });

        $('#sltTaskOwner').val(users_id_list[users_name_list.indexOf(data_arr.OwnerName)]).change();
        $('#txtTaskId').val(data_arr.TaskId);
        $('#txtTaskName').val(data_arr.TaskName).prop('disabled', true);
        $('#txtStartDate').val(new Date(data_arr.StartDate).toISOString().split('T')[0]).prop('disabled', true);
        $('#txtExpectedDate').val(new Date(data_arr.EstimatedDate).toISOString().split('T')[0]);
        $('#sltAssignTo').val(data_arr.AssignedTo).change();
        myTasks_assignee = data_arr.AssignedTo;
        $('#sltStatus').val(data_arr.TaskStatus).change();
        $('#txtDescription').val(data_arr.Details);

        $('#modalBtn').val('UPDATE');

        $('#mdModal').modal('show');
    });

    $('#mdModal').on('hidden.bs.modal', function () {
        
        $('#txtTaskId').val('');
        $('#txtTaskName').val('').prop('disabled', false);
        $('#txtStartDate').val('').prop('disabled',false);
        $('#txtExpectedDate').val('').prop('disabled', false);
        $('#sltAssignTo').val(0).change().prop('disabled', false);
        $('#sltAssignTo').prop('disabled', false);
        $('#sltStatus').val(0).change();
        $('#txtDescription').val('');

        $('#modalBtn').val('SAVE');

    })
})();

function getUsers() {
    getUsersApi(function (data) {
        var arr = JSON.parse(data);

        if (arr.length > 0) {
            $('#sltAssignTo').html('');
            $('#sltAssignTo').html('<option value="-1">Select asignee</option>');
            $.each(arr, function (index, item) {
                if (item.Userusername) {
                    users_name_list.push(item.UserName);
                    users_id_list.push(item.UserID);
                    if (userType == "OPERATIONS-MANAGER") {
                        if (item.UserID != userId && item.UserType == "ASST-OPERATIONS-MANAGER")
                            $('#sltAssignTo').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                    }
                    else {
                        if (item.UserID != userId)
                            $('#sltAssignTo').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                    }

                    $('#sltTaskOwner').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                    $('#sltUsers').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                }
            });
        }
    });
}

function getTasks() {

    var userId = $('#txtUserId').val();
    
    getAllTasks(function (data) {
        var arr = JSON.parse(data);

        if (arr.length > 0) {
            tableAll.clear().draw();
            tableMy.clear().draw();
            tableMe.clear().draw();
            tasks_list = [];
            $.each(arr, function (index, item) {
                tasks_list.push(item);
                var datee = formatDateTime(new Date(item.LastUpdate));
                var startDate = formatDate(new Date(item.StartDate));
                var estDate = formatDate(new Date(item.EstimatedDate));
                if (item.TaskStatus == "ON_APPROVAL" || item.IsGroupTask == true) {
                    if (userId == 3) {
                        tableMy.row.add([
                            item.TaskId,
                            startDate,
                            estDate,
                            item.TaskName,
                            (item.OwnerName) ? item.OwnerName : '',
                            (item.AssigneeName) ? item.AssigneeName : '',
                            item.Details,
                            datee,
                            item.TaskStatus
                                ]).draw();
                    }
                    else {
                        readonlyTable.row.add([
                            item.TaskId,
                            startDate,
                            estDate,
                            item.TaskName,
                            (item.OwnerName) ? item.OwnerName : '' ,
                            (item.AssigneeName) ? item.AssigneeName : '',
                            item.Details,
                            datee,
                            item.TaskStatus
                        ]).draw();
                    }
                }
                if (item.AssignedTo == userId) {
                    tableMy.row.add([
                    item.TaskId,
                    startDate,
                    estDate,
                    item.TaskName,
                    (item.OwnerName) ? item.OwnerName : '',
                    (item.AssigneeName) ? item.AssigneeName : '',
                    item.Details,
                    datee,
                    item.TaskStatus
                    ]).draw();
                }
                else if (item.TaskOwner == userId) {
                    tableMe.row.add([
                    item.TaskId,
                    startDate,
                    estDate,
                    item.TaskName,
                    (item.OwnerName) ? item.OwnerName : '',
                    (item.AssigneeName) ? item.AssigneeName : '',
                    item.Details,
                    datee,
                    item.TaskStatus
                    ]).draw();
                }
                if (item.TaskStatus.toLowerCase() == "completed") {
                    tableAll.row.add([
                    item.TaskId,
                    startDate,
                    estDate,
                    item.TaskName,
                    (item.OwnerName) ? item.OwnerName : '',
                    (item.AssigneeName) ? item.AssigneeName : '',
                    item.Details,
                    datee,
                    item.TaskStatus
                    ]).draw();
                }
            });

            $('.page-loader-wrapper').css('display', 'none');
        }
        else {
            $('.page-loader-wrapper').css('display', 'none');
        }
    });
}

function addTask() {

    var taskName = $('#txtTaskName').val();
    var startDate = $('#txtStartDate').val();
    var expectedDate = $('#txtExpectedDate').val();
    var assignto = $('#sltAssignTo').val(); 
    var ttype = $('#sltTaskType').val();
    var status = $('#sltStatus').val();
    var descp = $('#txtDescription').val();

    var userId = $('#txtUserId').val();

    if (taskName == '')
        alert('Name cannot be empty');

    var body = {
        TaskName: taskName,
        Details: descp,
        StartDate: startDate,
        EstimatedDate: expectedDate,
        TaskOwner: parseInt(userId),
        AssignedTo: parseInt(assignto),
        TaskStatus : status
    }

    addTaskApi(body, function (resp) {
        if (resp == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> New task has been added</div>')
            setTimeout(function () {
                
                window.location.href = window.location.href;

            }, 1500);
        }
        else {
            alert(resp);
        }
            
    });
}

function updateTask() {

    var taskId = $('#txtTaskId').val();
    var taskName = $('#txtTaskName').val();
    var startDate = $('#txtStartDate').val();
    var expectedDate = $('#txtExpectedDate').val();
    var priority = $('#sltPriority').val();
    var status = $('#sltStatus').val();
    var descp = $('#txtDescription').val();

    var userId = $('#txtUserId').val();

    if (taskName == '')
        alert('Name cannot be empty');

    var assignto = null;

    if ($('#sltAssignTo').val() == "-1")
        assignto = null;
    else
        assignto = $('#sltAssignTo').val();

    var body = {
        TaskId : taskId,
        TaskName: taskName,
        Details: descp,
        StartDate: startDate,
        EstimatedDate: expectedDate,
        TaskOwner: $('#sltTaskOwner').val(),
        AssignedTo: parseInt(assignto),
        TaskStatus: status
    }

    
    updateTaskApi(body, function (resp) {
        if (resp == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> Task has been updated</div>')
            setTimeout(function () {
                
                window.location.href = window.location.href;

            }, 1500);
        }
        else {
            alert(resp);
        }
    });
}

function modalBtnClick() {
    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait !</strong> working on your request</div>')
    if ($('#modalBtn').val() == "SAVE") {
        addTask();
    }
    else {
        updateTask();
    }

}

function addNewTaskRow() {
    tasksCounter += 1;
    var id = new Date().getUTCMilliseconds();
    var html = '<div id='+id+' class="row" style="margin-top: 10px">' +
                    '<div class="col-lg-5">' +
                        '<input id="taskName_'+tasksCounter+'" class="form-control" type="text" />' +
                    '</div>' +
                    '<div class="col-lg-3">' +
                        '<input id="taskDate_' + tasksCounter + '" class="form-control" type="date" />' +
                    '</div>' +
                    '<div class="col-lg-3">' +
                        '<input id="details_' + tasksCounter + '" class="form-control" type="text" />' +
                    '</div>' +
                    '<div class="col-lg-1">' +
                        '<button class="btn btn-default" onclick="removeTaskRow('+id+')">x</button>' +
                    '</div>' +
                '</div>';
    $('#allTasks').append(html);
}

function removeTaskRow(id) {
    tasksCounter -= 1;
    $('#' + id).remove();
}

function formatDateTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + strTime;
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

function getUserTasks() {
    getUsersActiveTasks(function (data) {
        var arr = JSON.parse(data);
        $.each(arr, function (index, item) {
            if (userId == 3) {
                usersTasksTable.row.add([
                            item.UserID,
                            item.Username,
                            item.ActiveTasks,
                            '<button class="btn btn-primary" onclick="showActiveTasks(' + item.UserID + ')">View</button>'

                ]).draw();
            }
            else {
                if(item.UserID == userId)
                    usersTasksTable.row.add([
                            item.UserID,
                            item.Username,
                            item.ActiveTasks,
                            '<button class="btn btn-primary" onclick="showActiveTasks(' + item.UserID + ')">View</button>'

                    ]).draw();
            }
            
        });
    });
}

function getGroupTasks() {
    if (userId == 3) {
        getGroupsActiveTasks(function (data) {
            var arr = JSON.parse(data);
            $.each(arr, function (index, item) {
                groupsTasksTable.row.add([
                                item.GroupId,
                                item.GroupName,
                                item.ActiveTasks,
                                '<button class="btn btn-primary" onclick="showActiveGroupTasks(' + item.GroupId + ')">View</button>'

                ]).draw();
            });
        });
    }
    else {
        getMyGroups(userId, function (groupIds) {
            groupIds = JSON.parse(groupIds);
            if (groupIds) {
                if (groupIds.length > 0) {
                    getGroupsActiveTasks(function (data) {
                        var arr = JSON.parse(data);
                        $.each(arr, function (index, item) {
                            for (var i = 0; i < groupIds.length; i++) {
                                if (item.GroupId == groupIds[i]) {
                                    groupsTasksTable.row.add([
                                                item.GroupId,
                                                item.GroupName,
                                                item.ActiveTasks,
                                                '<button class="btn btn-primary" onclick="showActiveGroupTasks(' + item.GroupId + ')">View</button>'

                                    ]).draw();
                                }
                            }
                        });
                    });
                }
            }
        });
    }
}

function showActiveTasks(id) {
    $('.loading').css('display', 'block');
    getUserPendingTasks(id, function (data) {
        $('.loading').css('display', 'none');
        var arr = JSON.parse(data);
        tasksList = [];
        if (arr.length > 0) {
            $('#UPTTable').html('');
            $.each(arr, function (index, item) {
                if (item.IsGroupTask == false) {
                    tasksList.push(item);
                    if (userId == 3) {
                        var html = '<tr>' +

                        '<td>' + item.TaskId + '</td>' +
                        '<td><input id="TTU_date_' + index + '" type="date" value="' + new Date(item.EstimatedDate).toLocaleDateString('en-CA') + '" /></td>' +
                        '<td><input id="TTU_task_' + index + '" type="text" value="' + item.TaskName + '" /></td>';

                    }
                    else {
                        var html = '<tr>' +

                        '<td>' + item.TaskId + '</td>' +
                        '<td>' + formatDate(new Date(item.EstimatedDate)) + '</td>' +
                        '<td>' + item.TaskName + '</td>';

                    }
                    
                    var v1, v2, v3, v4, v5, disb = '';
                    if (item.TaskStatus == "PENDING")
                        v1 = "selected";
                    else if (item.TaskStatus == "ON_APPROVAL")
                        v2 = "selected";
                    else if (item.TaskStatus == "IN_PROGRESS")
                        v3 = "selected";
                    else if (item.TaskStatus == "COMPLETED")
                        v4 = "selected";
                    else if (item.TaskStatus == "APPROVED")
                        v5 = "selected";

                    var st = '';
                    if (v1)
                        st = "red";
                    else if (v2)
                        st = "orange";
                    else if (v3)
                        st = "yellow";
                    else if (v5)
                        st = "lime";

                    //html += '<td>' + item.Details + '</td>'

                    html += '<td>' +
                                '<select id=' + item.TaskId + ' style="background-color: ' + st + '" id="slt' + index + '" ' + disb + '>' +
                                    '<option value="PENDING" ' + v1 + '>Pending</option>';
                    //                '<option value="ON_APPROVAL"  ' + v2 + '>On Approval</option>';
                    //if (userId == 3 || userId == 15)
                    //    html +=     '<option value="APPROVED"  ' + v5 + '>Approved</option>';
                    html +=         '<option value="IN_PROGRESS"  ' + v3 + '>In Progress</option>' +
                                    '<option value="COMPLETED"  ' + v4 + '>Completed</option>' +
                                '</select>';
                    html += '<td>'+
                                '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo' + index + '">Remarks</button>' +
                            '</td>';
                    html += '</tr>';
                    html += '<tr id="demo' + index + '" class="collapse"><td colspan="5">';

                    var convo = item.Details.split(';');

                    $.each(convo, function (i, it) {
                        html += it + '<br>';
                    });

                    html += '<textarea id="area' + index + '" rows="4" class="form-control no-resize bg-grey"></textarea>' +
                                '</td>' +
                            '</tr>"';
                    //else
                    //    html += '<td>'+
                    //                '<select>'+
                    //                    '<option>In Progress</option>'+
                    //                    '<option>Completed</option>'+
                    //                '</select>'+
                    //            '</td>';

                    $('#UPTTable').append(html);
                }
            });
        }
        $('#mdTasksModal').modal('show');
    });
}

function showActiveGroupTasks(id) {
    $('.loading').css('display', 'block');
    getGroupPendingTasks(id, function (data) {
        $('.loading').css('display', 'none');

        var arr = JSON.parse(data);
        tasksList = [];
        if (arr.length > 0) {
            $('#UPTTable').html('');
            $.each(arr, function (index, item) {
                tasksList.push(item);
                var html = '<tr>' +

                    '<td>' + item.TaskId + '</td>' +
                    '<td>' + formatDate(new Date(item.EstimatedDate)) + '</td>' +
                    '<td>' + item.TaskName + '</td>';

                var v1, v2, v3, v4, v5, disb = '';
                if (item.TaskStatus == "PENDING")
                    v1 = "selected";
                else if (item.TaskStatus == "ON_APPROVAL")
                    v2 = "selected";
                else if (item.TaskStatus == "IN_PROGRESS")
                    v3 = "selected";
                else if (item.TaskStatus == "COMPLETED")
                    v4 = "selected";
                else if (item.TaskStatus == "APPROVED")
                    v5 = "selected";

                var st = '';
                if (v1)
                    st = "red";
                else if (v2)
                    st = "orange";
                else if (v3)
                    st = "yellow";
                else if (v5)
                    st = "lime";

                //html += '<td>' + item.Details + '</td>'

                html += '<td>' +
                                '<select id=' + item.TaskId + ' style="background-color: ' + st + '" id="slt' + index + '" ' + disb + '>' +
                                    '<option value="PENDING" ' + v1 + '>Pending</option>';
                //                '<option value="ON_APPROVAL"  ' + v2 + '>On Approval</option>';
                //if (userId == 3 || userId == 15)
                //    html +=     '<option value="APPROVED"  ' + v5 + '>Approved</option>';
                html += '<option value="IN_PROGRESS"  ' + v3 + '>In Progress</option>' +
                                '<option value="COMPLETED"  ' + v4 + '>Completed</option>' +
                            '</select>';
                html += '<td>' +
                            '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo' + index + '">Remarks</button>' +
                        '</td>';
                html += '</tr>';
                html += '<tr id="demo' + index + '" class="collapse"><td colspan="5">';

                var convo = item.Details.split(';');

                $.each(convo, function (i, it) {
                    html += it + '<br>';
                });

                html += '<textarea id="area' + index + '" rows="4" class="form-control no-resize bg-grey"></textarea>' +
                            '</td>' +
                        '</tr>"';

                $('#UPTTable').append(html);

            });
        }
        $('#mdTasksModal').modal('show');
    });
}

function submitUpdate() {

    $('#msgDiv').html('<div class="alert alert-info"><strong>Please wait...</strong></div>');

    $.each(tasksList, function (index, item) {
        var remark = $('#area' + index).val();
        if (remark != '')
            tasksList[index].Details += ';' + $('#txtUserName').val() + ' : ' + remark;
        tasksList[index].TaskStatus = $('#' + item.TaskId).val();
        if (userId == 3) {
            tasksList[index].EstimatedDate = $('#TTU_date_' + index).val();
            tasksList[index].taskName = $('#TTU_task_' + index).val();
        }
    });

    submitApprovalApi(tasksList, function (data) {
        if (data == "1") {
            $('#msgDiv').html('<div class="alert alert-success"><strong>Updated successfully</strong></div>');
            window.location.href = window.location.href;
        }
        else {
            $('#msgDiv').html('<div class="alert alert-danger"><strong>Unkown error occured. Try again later</strong></div>');
        }

    });
}

function getGroups() {
    getGroupsApi(function (data) {
        var arr = JSON.parse(data);
        $.each(arr, function (index, item) {
            $('#sltGroups').append('<option value='+item.GroupId+'>'+item.GroupName+'</option>')
        });
    });
}

function submitTasks() {
    
    var tasks = [];
    for (var i = 1; i <= tasksCounter; i++) {
        var cc = ($('#sltGroups').val() == '-1') ? null : $('#sltGroups').val();
        var isGT = (cc) ? true : false;
        var details = $('#details_' + i).val();
        if (details != '')
            details = $('#txtUserName').val() + ' : ' + details;
        if ($('#taskName_' + i).val()) {
            tasks.push({
                "AssignedTo": $('#sltUsers').val(),
                "IsGroupTask": false,
                "TaskName": $('#taskName_' + i).val(),
                "StartDate": new Date().toISOString().split('T')[0],
                "EstimatedDate": $('#taskDate_' + i).val(),
                "TaskStatus": 'PENDING',
                "Details": details,
                "TaskOwner": parseInt(userId),
                "CCGroupId": cc,
                "IsGroupTask": isGT
            });
        }
        else {
            tasks.push({
                "AssignedTo": $('#sltUsers').val(),
                "CCGroupId": $('#sltGroups').val(),
                "IsGroupTask": true,
                "TaskName": $('#taskName_' + i).val(),
                "StartDate": new Date().toISOString().split('T')[0],
                "EstimatedDate": $('#taskDate_' + i).val(),
                "TaskStatus": 'PENDING',
                "Details": details,
                "TaskOwner": parseInt(userId),
                "CCGroupId": cc,
                "IsGroupTask": isGT
            });
        }
        if ($('#sltGroups').val() == '-1') {
            
        }
    }
    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait...</div>')
    submitNewTasksApi(tasks, function (data) {
        if (data == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> New task has been added</div>')
            setTimeout(function () {

                window.location.href = window.location.href;

            }, 1500);
        }
        else {
            alert(data);
        }
    });

}