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

var tasks_list = [];
var users_name_list = [];
var users_id_list = [];

var userId = null;
var userType = null;

var myTasks_assignee = null;

(function () {

    userId = $('#txtUserId').val();
    userType = $('#txtUserType').val();

    if (userId == 3) {
        $('.nav-tabs li')[0].className = 'active';
        $('#all').addClass('active');
        $('#all').addClass('in');
    }
    else {
        $('.nav-tabs li')[1].className = 'active';
        $('#my_tasks').addClass('active');
        $('#my_tasks').addClass('in');
    }

    getUserTasks();
    getUsers();
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
                
                users_name_list.push(item.UserName);
                users_id_list.push(item.UserID);
                
                if (userType == "OPERATIONS-MANAGER") {
                    if(item.UserID != userId && item.UserType == "ASST-OPERATIONS-MANAGER")
                        $('#sltAssignTo').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                }
                else{
                    if(item.UserID != userId)
                        $('#sltAssignTo').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                }
                    
                $('#sltTaskOwner').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
            });
        }
    });
}

function getTasks() {

    var userId = $('#txtUserId').val();
    
    getTasksByUserId(userId, function (data) {
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
                if (item.TaskStatus == "ON_APPROVAL") {
                    if (userId == 3) {
                        tableMy.row.add([
                            item.TaskId,
                            startDate,
                            estDate,
                            item.TaskName,
                            item.OwnerName,
                            item.AssigneeName,
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
                            item.OwnerName,
                            item.AssigneeName,
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
                    item.OwnerName,
                    item.AssigneeName,
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
                    item.OwnerName,
                    item.AssigneeName,
                    item.Details,
                    datee,
                    item.TaskStatus
                    ]).draw();
                }
                tableAll.row.add([
                    item.TaskId,
                    startDate,
                    estDate,
                    item.TaskName,
                    item.OwnerName,
                    item.AssigneeName,
                    item.Details,
                    datee,
                    item.TaskStatus
                ]).draw();
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
    var id = new Date().getUTCMilliseconds();
    var html = '<div id='+id+' class="row" style="margin-top: 10px">' +
                    '<div class="col-lg-3">' +
                        '<input class="form-control" type="text" />' +
                    '</div>' +
                    '<div class="col-lg-3">' +
                        '<input class="form-control" type="date" />' +
                    '</div>' +
                    '<div class="col-lg-2">' +
                        '<select class="form-control">' +
                            '<option>Pending</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="col-lg-3">' +
                        '<input class="form-control" type="text" />' +
                    '</div>' +
                    '<div class="col-lg-1">' +
                        '<button class="btn btn-default" onclick="removeTaskRow('+id+')">x</button>' +
                    '</div>' +
                '</div>';
    $('#allTasks').append(html);
}

function removeTaskRow(id) {
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
            usersTasksTable.row.add([
                            item.UserID,
                            item.Username,
                            item.ActiveTasks,
                            '<button class="btn btn-primary">View</button>'
                            
            ]).draw();
        });
    });
}
