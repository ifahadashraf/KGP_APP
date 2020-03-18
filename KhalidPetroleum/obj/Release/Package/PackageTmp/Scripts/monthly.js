function getMonthlyReport () {
    
    var from = $('#txtFromDate').val();
    var to = $('#txtToDate').val();

    var table = $('#reportTable').DataTable({
        "order": [[0, "desc"]],
        "bDestroy": true,
        "rowCallback": function (row, data) {
            if (data[29] > 0) {
                $('td:eq(29)', row).css('color', 'green');
            } else {
                $('td:eq(29)', row).css('color', 'red');
            }
        }
    });

    if (from != "" && to != "") {
        swal({
            title: "Sure? It might take 10-15 secs",
            text: "Wanna fetch report from " + from + " to " + to + " ?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            getMonthlyReportApi(from, to, function (data) {
                table.clear().draw();
                var results = JSON.parse(data);
                for (x = 0; x < results.length; x++) {
                    var rowData = [];
                    var keys = Object.keys(results[x]);
                    for (var i = 0; i < keys.length; i++) {
                        if(keys[i] === "Date") {
                            var date = new Date(results[x][keys[i]]);
                            var dateStr = (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + (date.getYear() - 100);
                            rowData.push(dateStr);
                        } else if (keys[i] === "PetrolAverage") {
                            var avg = ((results[x].ClosingMeter - results[x].OpeningMeter) / results[x].FilledFuelQuantity).toFixed(2);;
                            rowData.push(avg);
                        } else {
                            rowData.push(results[x][keys[i]]);
                        }
                    }
                    var expenses = results[x].ToolExpense +
                            results[x].MunshiExpense +
                            results[x].ParkingExpense +
                            results[x].MealExpense +
                            results[x].OtherExpense +
                            (results[x].FilledFuelRate * results[x].FilledFuelQuantity);

                    var recovery = (results[x].SUPDifferenceRate * results[x].SUPDifferenceQuantity) +
                        (results[x].HSDDifferenceRate * results[x].HSDDifferenceQuantity);

                    var gainLoss = (recovery - expenses).toFixed(2);

                    rowData.push(gainLoss);
                    table.row.add(rowData).draw();
                }
                swal({
                    title: "",
                    text: "",
                    timer: 100,
                    showConfirmButton: false
                });
            });
        });
    }
    else {
        alert("Please select a date.")
    }
}