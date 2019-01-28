var checklistsTable = null;
var tasksList = [];

(function () {

    checklistsTable = $('#checklistsTable').DataTable({
        "order": [[ 0, "desc" ]],
        "pageLength": 10,
        "rowCallback": function (row, data) {
            if (data[5] == "On Approval") {
                $('td:eq(5)', row).css('background-color', 'orange');
                $('td:eq(5)', row).css('color', 'white');
            }
            else if (data[5] == "Completed") {
                $('td:eq(5)', row).css('background-color', 'green');
                $('td:eq(5)', row).css('color', 'white');
            }
            else {
                $('td:eq(5)', row).css('background-color', 'lime');
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
    })

    getChecklists();

})();

function getChecklists() {

    getChecklistsApi(function (data) {

        var arr = JSON.parse(data);

        $.each(arr, function (index, item) {

            var date = new Date(item.Date);
            dateStr = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getYear();

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

    getMaintenanceTasksApi(id, function (data) {
        $('.loading').css('display', 'none');
        var arr = JSON.parse(data);
        tasksList = arr;
        $('#tasksTable').html('');
        $.each(arr, function (index, item) {

            var html = '<tr>' +
                '<td>'+item.TaskId+'</td>'+
                '<td>'+item.TaskName+'</td>';

            if (item.IsApproved) {
                html += '<td><input name="group' + index + '" type="radio" id="radio_' + index + '1" class="with-gap radio-col-green" value="1" checked/><label for="radio_' + index + '1"></label>' +
                        '<input name="group' + index + '" type="radio" id="radio_' + index + '2" class="with-gap radio-col-red" value="0"/><label for="radio_' + index + '2"></label></td>';
            }
            else{
                html += '<td><input name="group' + index + '" type="radio" id="radio_' + index + '1" class="with-gap radio-col-green" value="1"/><label for="radio_' + index + '1"></label>' +
                        '<input name="group' + index + '" type="radio" id="radio_' + index + '2" class="with-gap radio-col-red" value="0" checked/><label for="radio_' + index + '2"></label></td>';
            }
            html += '<td>'+
                        '<select>'+
                            '<option>On Approval</option>'+
                            '<option>Approved</option>'+
                            '<option>In Progress</option>'+
                            '<option>Completed</option>'+
                        '</select>'+
                    '</td>'+
                '<td><button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo'+index+'">Remarks</button></td></tr>';

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

        $('#mdModal').modal('show');
    })
}

function submitApproval() {

    console.log(tasksList);
    
    $.each(tasksList, function (index, item) {
        var isApproved = ($("input:radio[name ='group" + index + "']:checked").val() == "1");
        var remark = $('#area' + index).val();

        tasksList[index].IsApproved = isApproved;
        if (remark != '')
            tasksList[index].Details += ';' + $('#uname').val() + ' : ' + remark;
    });

    submitApprovalApi(tasksList, function (data) {
        if (data == "1")
            alert("Updated.");
        else
            alert("Error")

        $('#mdModal').modal('hide');

    });
    

}