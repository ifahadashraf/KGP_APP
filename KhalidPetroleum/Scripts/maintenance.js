(function () {

    var checklistsTable = $('#checklistsTable').DataTable({
        "order": [[0, "desc"]],
        "pageLength": 10,
        "rowCallback": function (row, data) {
            if (data[2] == "On Approval") {
                $('td:eq(2)', row).css('background-color', 'orange');
                $('td:eq(2)', row).css('color', 'white');
            }
            else if (data[2] == "Completed") {
                $('td:eq(2)', row).css('background-color', 'green');
                $('td:eq(2)', row).css('color', 'white');
            }
            else {
                $('td:eq(2)', row).css('background-color', 'lime');
                $('td:eq(2)', row).css('color', 'white');
            }
        }
    });

    $('#checklistsTable').on('click', 'tbody tr', function () {

        var rowData = checklistsTable.row(this).data();

        $('#modalVNO').text(rowData[1] + ' (' + rowData[0] + ')');
        $('#mdModal').modal('show');
    });

})();