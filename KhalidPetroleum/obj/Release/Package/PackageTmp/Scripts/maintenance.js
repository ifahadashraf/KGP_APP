var checklistsTable = null;
var tasksList = [];

(function () {

    checklistsTable = $('#checklistsTable').DataTable({
        "order": [[ 0, "desc" ]],
        "pageLength": 10,
        "rowCallback": function (row, data) {
            if (data[5] == "ON_APPROVAL") {
                $('td:eq(5)', row).css('background-color', 'orange');
                $('td:eq(5)', row).css('color', 'white');
            }
            else if (data[5] == "COMPLETED") {
                $('td:eq(5)', row).css('background-color', 'green');
                $('td:eq(5)', row).css('color', 'white');
            }
            else if (data[5] == "APPROVED") {
                $('td:eq(5)', row).css('background-color', 'lime');
                $('td:eq(5)', row).css('color', 'white');
            }
            else if (data[5] == "IN_PROGRESS") {
                $('td:eq(5)', row).css('background-color', 'yellow');
                $('td:eq(5)', row).css('color', 'black');
            }
            else {
                $('td:eq(5)', row).css('background-color', 'red');
                $('td:eq(5)', row).css('color', 'white');
            }
        }
    });

    //$('#checklistsTable').on('click', 'tbody tr', function () {

    //    var rowData = checklistsTable.row(this).data();

    //    $('#modalVNO').text(rowData[1] + ' (' + rowData[0] + ')');
    //    $('#mdModal').modal('show');

        
    //});

    $('#mdModal').on('hidden.bs.modal', function () {
        // do something…
        $('.loading').css('display', 'none');
        $('#msgDiv').html('');
    })

    getChecklists();

})();

function getChecklists() {

    getChecklistsApi(function (data) {

        var arr = JSON.parse(data);

        $.each(arr, function (index, item) {

            var date = new Date(item.Date);
            dateStr = (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + (date.getYear() - 100);

            checklistsTable.row.add([
                item.CheckListID,
                dateStr,
                item.VehicleNumber,
                item.FillerName,
                item.ApproverName,
                item.Status,
                '<button type="button" class="btn btn-primary m-t-15 waves-effect" onclick="getMaintenanceTasks(\'' + item.VehicleNumber + '\',\'' + dateStr + '\',\'' + item.CheckListID + '\')">View more</button>'
            ]).draw();
        });

    });
}

function getMaintenanceTasks(vno, date, id) {

    $('.loading').css('display', 'block');

    $('#modalVNO').text(vno + ' (' + date + ')');

    var userId = $('#uid').val();

    getMaintenanceTasksApi(id, function (data) {
        $('.loading').css('display', 'none');
        var arr = JSON.parse(data);
        tasksList = arr;
        $('#tasksTable').html('');
        $.each(arr, function (index, item) {

            var html = '<tr>' +

                '<td>' + item.TaskId + '</td>' +

                '<td>' + item.TaskName + '</td>';

            if (item.IsApproved) {
                html += '<td class="pl"><input name="group' + index + '" type="radio" id="radio_' + index + '1" class="with-gap radio-col-green" value="1" checked/><label for="radio_' + index + '1"></label>' +
                        '<input name="group' + index + '" type="radio" id="radio_' + index + '2" class="with-gap radio-col-red" value="0"/><label for="radio_' + index + '2"></label></td>';
            }
            else{
                html += '<td class="pl"><input name="group' + index + '" type="radio" id="radio_' + index + '1" class="with-gap radio-col-green" value="1"/><label for="radio_' + index + '1"></label>' +
                        '<input name="group' + index + '" type="radio" id="radio_' + index + '2" class="with-gap radio-col-red" value="0" checked/><label for="radio_' + index + '2"></label></td>';
            }

            if (item.IsApproved)
                html += '<td class="pd" style="color: green">Approved</td>';
            else
                html += '<td class="pd" style="color: red">Denied</td>';

            var v1, v2, v3, v4, v5, disb = '';
            if (item.TaskStatus == "PENDING")
                v1 = "selected";
            else if (item.TaskStatus == "ON_APPROVAL")
                v2 = "selected";
            else if (item.TaskStatus == "IN_PROGRESS")
                v3 = "selected";
            else if (item.TaskStatus == "COMPLETED")
                v4 = "selected";
            
            if ((userId != 3) && !item.IsApproved) {
                disb = 'disabled';
            }

                html += '<td>'+
                            '<select id="slt'+index+'" '+disb+'>'+
                                '<option value="PENDING" ' + v1 + '>Pending</option>' +
                                '<option value="IN_PROGRESS"  ' + v3 + '>In Progress</option>' +
                                '<option value="COMPLETED"  ' + v4 + '>Completed</option>' +
                            '</select>'+
                        '</td>';
            //else
            //    html += '<td>'+
            //                '<select>'+
            //                    '<option>In Progress</option>'+
            //                    '<option>Completed</option>'+
            //                '</select>'+
            //            '</td>';

            html += '<td><button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo' + index + '">Remarks</button></td></tr>';


            html += '<tr id="demo' + index + '" class="collapse"><td colspan="5">';

            var convo = item.Details.split(';');

            $.each(convo, function (i, it) {
                html += it + '<br>';
            });

            html += '<textarea id="area'+index+'" rows="4" class="form-control no-resize bg-grey"></textarea>' +
                        '</td>' +
                    '</tr>"';

            $('#tasksTable').append(html);

        });

        if (userId == 3 || userId == 15) {
            $('.pl').css('display', 'block');
            $('.pd').css('display', 'none');
        }
        else {
            $('.pl').css('display', 'none');
            $('.pd').css('display', 'block');
        }
            

        $('#mdModal').modal('show');
    })
}

function submitApproval() {
    
    $('#msgDiv').html('<div class="alert alert-info"><strong>Please wait...</strong></div>');

    $.each(tasksList, function (index, item) {
        var isApproved = ($("input:radio[name ='group" + index + "']:checked").val() == "1");
        var remark = $('#area' + index).val();

        tasksList[index].IsApproved = isApproved;
        if (remark != '')
            tasksList[index].Details += ';' + $('#uname').val() + ' : ' + remark;
        tasksList[index].TaskStatus = $('#slt' + index).val()
    });

    submitApprovalApi(tasksList, function (data) {
        if (data == "1"){
            $('#msgDiv').html('<div class="alert alert-success"><strong>Updated successfully</strong></div>');
            window.location.href = window.location.href;
        }
        else{
            $('#msgDiv').html('<div class="alert alert-danger"><strong>Unkown error occured. Try again later</strong></div>');
        }

    });
    

}