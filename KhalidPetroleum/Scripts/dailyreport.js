$(document).ready(function () {

});

$(document).on("click", ".expand_report", function () {

    var report = list_reports[(this.id)].report;

    $("#depotName").html(report.DepotName);
    $("#depotCode").html(report.DepotCode);

    $("#totalQty").html(report.PurchasedSUP + report.PurchasedHSD);
    $('#purchasedSUP').html(report.PurchasedSUP);
    $('#purchasedHSD').html(report.PurchasedHSD);

    $('#check_pump_sup').html('');
    $('#check_machi_sup').html('');

    $('#check_pump_hsd').html('');
    $('#check_machi_hsd').html('');

    if (report.PurchasedSUP > 0) {
        if (report.SUPDropOff == "PUMP") {
            $('#check_pump_sup').html('<input type="checkbox" id="supPump" checked><label for="remember_me_3"> </label>');
        }
        else {
            $('#check_machi_sup').html('<input type="checkbox" id="supPump" checked><label for="remember_me_3"> </label>');
        }
    }

    if (report.PurchasedHSD > 0) {
        if (report.SUPDropOff == "PUMP") {
            $('#check_pump_hsd').html('<input type="checkbox" id="supPump" checked><label for="remember_me_3"> </label>');
        }
        else {
            $('#check_machi_hsd').html('<input type="checkbox" id="supPump" checked><label for="remember_me_3"> </label>');
        }
    }


    $('#SUPDifferenceRate').html(report.SUPDifferenceRate);
    $('#SUPDifferenceQuantity').html(report.SUPDifferenceQuantity);
    $('#sup_diff_recieved').html(report.SUPDifferenceRate * report.SUPDifferenceQuantity);

    $('#HSDDifferenceRate').html(report.HSDDifferenceRate);
    $('#HSDDifferenceQuantity').html(report.HSDDifferenceQuantity);
    $('#hsd_diff_recieved').html(report.HSDDifferenceRate * report.HSDDifferenceQuantity);

    $('#tool').html(report.ToolExpense);
    $('#munshi').html(report.MunshiExpense);
    $("#parking").html(report.ParkingExpense);
    $("#meal").html(report.MealExpense);
    $("#other").html(report.OtherExpense);
    $("#expense_paid").html(report.ToolExpense + report.MunshiExpense + report.ParkingExpense + report.MealExpense + report.OtherExpense)

    $('#FilledFuelRate').html(report.FilledFuelRate);
    $('#FilledFuelQuantity').html(report.FilledFuelQuantity);
    $('#expense_fuel').html(report.FilledFuelRate * report.FilledFuelQuantity);

    $('#OpeningMeter').html(report.OpeningMeter);
    $('#ClosingMeter').html(report.ClosingMeter);
    $('#total_kms').html(report.ClosingMeter - report.OpeningMeter);
    $('#avg').html((report.ClosingMeter - report.OpeningMeter) / report.FilledFuelQuantity);
    var expenses = report.ToolExpense + report.MunshiExpense + report.ParkingExpense + report.MealExpense + report.OtherExpense + (report.FilledFuelRate * report.FilledFuelQuantity);
    var recovery = (report.SUPDifferenceRate * report.SUPDifferenceQuantity) + (report.HSDDifferenceRate * report.HSDDifferenceQuantity);

    if (recovery - expenses > 0) {
        $('#total_gain').html(recovery - expenses);
        $('#total_loss').html('-');
    }
    else if (recovery - expenses == 0) {
        $('#total_gain').html(0);
        $('#total_loss').html(0);
    }
    else {
        $('#total_loss').html(expenses - recovery);
        $('#total_gain').html('-');
    }

    for (var i = 0; i < 4; i++) {
        $('#dno_' + i).html('');
        $('#qty_' + i).html('');
        $('#site_' + i).html('');
    }

    getDailyReportSalesApi(report.DailyReportID, function (data) {

        $.each(JSON.parse(data), function (index, item) {

            $('#dno_' + index).html(item.DeliveryNo);
            $('#qty_' + index).html(item.Quantity);
            $('#site_' + index).html(item.SiteName);

        });

    });

    
});

var list_reports = [];

function getDailyReports() {

    var table = $('#reportTable').DataTable();

    var from = $('#txtFromDate').val();
    var to = $('#txtToDate').val();

    if (from != "" && to != "") {
        swal({
            title: "Sure? It might take 10-15 secs",
            text: "Wanna fetch report from " + from + " to " + to + " ?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            getDailyReportsApi(from, to, function (data) {
                var arr = JSON.parse(data);

                if (arr.length > 0) {
                    table.clear().draw();
                    $.each(arr, function (index, item) {
                        list_reports.push(item);
                        var date = new Date(item.report.Date);
                        dateStr = (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + (date.getYear() - 100);
                        table.row.add([
                            item.report.DailyReportID,
                            dateStr,
                            item.report.VehicleNumber,
                            item.report.UserName,
                            item.report.DepotID,
                            item.report.DepotName,
                            '<div class="row"><div class="col-md-6"><button type="button" class="btn bg-light-blue waves-effect expand_report" data-toggle="modal" data-target="#mdModal" id=' + index + '>Expand</button></div> <div class="col-md-6"><button type="button" class="btn bg-light-blue waves-effect" data-toggle="modal" data-target="#galleryModal" onclick="makeTiles(' + item.report.DailyReportID + ')">Images</button></div></div>'
                        ]).draw();
                    });
                    swal({
                        title: "",
                        text: "",
                        timer: 100,
                        showConfirmButton: false
                    });
                }
                else {
                    swal("No records found.")
                }
            });
        });
    }
    else {
        alert("Please select a date.")
    }
    
}

function viewSales(id) {
    swal({
        title: "Sales Details",
        text: '<p>'+id+'</p>',
        html: true
    });
}

var isLoaded = false;

function makeTiles(id) {
    $('#aniimated-thumbnials').html('');
    getReportImagesApi(id,function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            var itemsProcessed = 0;
            $.each(arr, function (index, item) {
                $('#aniimated-thumbnials').
                    append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">'+
                                '<a href="../../Content/images/' + item.SaleReceiptImage + '" data-sub-html="Demo Description" target="_blank">' +
                                    '<img class="img-responsive thumbnail" src="../../Content/images/' + item.SaleReceiptImage + '">' +
                                '</a>'+
                           '</div>');
                itemsProcessed++;
            });
        }
        else {
            $('#aniimated-thumbnials').html('<h4>No images attached</h4>');
        }
    });
    
}