$(document).ready(function () {
    getVehicles();
    getDepots();
    getDrivers();
    getUnloadSites();
    window.setTimeout(function () {
        addNewSalesRow()
    }, 5000);
});

var listOfReading = [];
var listOfRowIds = [];
var listOfDepotNames = [];
var listOfUnloadSites = [];

//*********************************************JS FUNCTIONS**********************************************//

function addNewSalesRow() {
    if (listOfRowIds.length == 0)
    {
        var currentTime = +new Date();
        var html = '<tr id="' + currentTime + '">' +
                                '<td class="col-md-3">' +
                                    '<div class="form-group">' +
                                        '<div class="form-line">' +
                                            '<input type="number" id="txtDeliveryNo" class="form-control" placeholder="">' +
                                        '</div>' +
                                    '</div>' +
                                '</td>' +
                                '<td class="col-md-3">' +
                                    '<div class="form-group">' +
                                        '<div class="form-line">' +
                                            '<input type="number" id="txtSaleQuantity" class="form-control" placeholder="">' +
                                        '</div>' +
                                    '</div>' +
                                '</td>' +
                                '<td class="col-md-3">' +
                                    '<div class="form-group">' +
                                        '<div class="form-line">' +
                                            '<input id="inp'+currentTime+'" type="text" style="display:none" hidden/>'+
                                            '<select id="txtUnloadSite" class="form-control" onchange="setHidden(this,\'inp'+currentTime+'\')"><option>-Select Site-</option>';
                                                $.each(listOfUnloadSites,function(index,item){
                                                    html += '<option value="' + item.SiteID + '">' + item.SiteID +' - '+ item.SiteName + '</option>';
                                                });
                                    html += '</select>' +
                                        '</div>' +
                                    '</div>' +
                                '</td>' +
                                '<td class="col-md-2">' +
                                    '<div class="form-group">' +
                                        '<div class="form-line">' +
                                            '<input type="file" id="fileUpload" class="form-control" placeholder="" accept="image/jpeg">' +
                                        '</div>' +
                                    '</div>' +
                                '</td>' +
                            '</tr>';
        $('#salesTable').append(html);
        listOfRowIds.push(currentTime);
    }
    else {
        var currentTime = +new Date();
        var html = '<tr id="' + currentTime + '">' +
                        '<td class="col-md-3">' +
                            '<div class="form-group">' +
                                '<div class="form-line">' +
                                    '<input type="number" id="txtDeliveryNo" class="form-control" placeholder="">' +
                                '</div>' +
                            '</div>' +
                        '</td>' +
                        '<td class="col-md-3">' +
                            '<div class="form-group">' +
                                '<div class="form-line">' +
                                    '<input type="number" id="txtSaleQuantity" class="form-control" placeholder="">' +
                                '</div>' +
                            '</div>' +
                        '</td>' +
                        '<td class="col-md-3">' +
                            '<div class="form-group">' +
                                '<div class="form-line">' +
                                    '<input id="inp' + currentTime + '" type="text" style="display:none" hidden/>' +
                                    '<select id="txtUnloadSite" class="form-control" onchange="setHidden(this,\'inp' + currentTime + '\')"><option>-Select Site-</option>';
                                        $.each(listOfUnloadSites,function(index,item){
                                            html += '<option value="' + item.SiteID + '">' + item.SiteID +' - '+ item.SiteName + '</option>';
                                        });
                            html += '</select>' +
                                '</div>' +
                            '</div>' +
                        '</td>' +
                        '<td class="col-md-2">' +
                            '<div class="form-group">' +
                                '<div class="form-line">' +
                                    '<input type="file" id="fileUpload" class="form-control" placeholder="" accept="image/jpeg">' +
                                '</div>' +
                            '</div>' +
                        '</td>' +
                        '<td class="col-md-1">' +
                            '<button type="button" class="btn btn-default waves-effect" onclick="delrow(' + currentTime + ')">' +
                                    '<i class="material-icons">clear</i>' +
                            '</button>' +
                        '</td>' +
                    '</tr>';
        $('#salesTable').append(html);
        listOfRowIds.push(currentTime);
    }
}

function setTotal() {
    var sup = (($('#txtSUP').val() == '') ? 0 : $('#txtSUP').val());
    var hsd = (($('#txtHSD').val() == '') ? 0 : $('#txtHSD').val());

    $('#txtTotalQuantity').val(parseInt(sup) + parseInt(hsd));
}

function setPaid() {
    var tool = (($('#txtToolExp').val() == '') ? 0 : $('#txtToolExp').val());
    var munshi = (($('#txtMunshiExp').val() == '') ? 0 : $('#txtMunshiExp').val());
    var parking = (($('#txtParkingExp').val() == '') ? 0 : $('#txtParkingExp').val());
    var guard = (($('#txtGuardExp').val() == '') ? 0 : $('#txtGuardExp').val());
    var meal = (($('#txtMealExp').val() == '') ? 0 : $('#txtMealExp').val());
    var other = (($('#txtOtherExp').val() == '') ? 0 : $('#txtOtherExp').val());

    var fuelRate = (($('#txtRateLubeFuel').val() == '') ? 0 : $('#txtRateLubeFuel').val());
    var fuelQty = (($('#txtQuantityLubeFuel').val() == '') ? 0 : $('#txtQuantityLubeFuel').val());

    var cost = (parseFloat(fuelRate) * parseFloat(fuelQty));

    $('#txtTotalPaid').val(parseInt(tool) + parseInt(munshi) + parseInt(parking) + parseInt(guard) + parseInt(meal) + parseInt(other) + cost);
    setGainLoss();
}

function setGain() {

    var supRate = (($('#txtRateSup').val() == '') ? 0 : $('#txtRateSup').val());
    var supQuantity = (($('#txtQuantitySup').val() == '') ? 0 : $('#txtQuantitySup').val());

    var hsdRate = (($('#txtRateHsd').val() == '') ? 0 : $('#txtRateHsd').val());
    var hsdQuantity = (($('#txtQuantityHsd').val() == '') ? 0 : $('#txtQuantityHsd').val());

    var sum = (parseFloat(supRate) * parseFloat(supQuantity)) + (parseFloat(hsdRate) * parseFloat(hsdQuantity));

    $('#txtTotalReceived').val(sum);
    setGainLoss();
}

function setGainLoss() {
    var loss = (($('#txtTotalPaid').val() == '') ? 0 : $('#txtTotalPaid').val());
    var gain = (($('#txtTotalReceived').val() == '') ? 0 : $('#txtTotalReceived').val());

    $('#txtNetGainLoss').val(parseInt(gain)-parseInt(loss));
}

function setCurrentReading() {
    var index = $("#txtVechileNo option:selected").index();
    var reading = listOfReading[index - 1];
    $('#txtOpeningMeter').val(reading);
}

function setDepotName() {
    var index = $("#txtDepotCode option:selected").index();
    var name = listOfDepotNames[index - 1];
    $('#txtDepotName').val(name);
}

function delrow(ctx) {
    $('#' + ctx).remove();
    listOfRowIds.pop(ctx);
}

function readImage(inputElement) {
    var deferred = $.Deferred();

    var files = inputElement.files;
    if (files && files[0]) {
        var fr = new FileReader();
        fr.onload = function (e) {
            deferred.resolve(e.target.result);
        };
        fr.readAsDataURL(files[0]);
    } else {
        deferred.resolve(undefined);
    }

    return deferred.promise();
}

function setTotalKM()
{
    var close = $('#txtClosingMeter').val();
    var open = $('#txtOpeningMeter').val();

    $('#txtKilometers').val(parseInt(close) - parseInt(open));

    var qty = (($('#txtQuantityLubeFuel').val() == '') ? 0 : $('#txtQuantityLubeFuel').val());
    if (qty != 0) {
        var kms = $('#txtKilometers').val();
        var val = parseInt(kms)/qty
        $('#txtAverage').val(val);
    }
}

function setHidden(ctx,id) {
    $('#' + id).val($(ctx).val());
}

//*******************************************END JS FUNCTIONS**********************************************//

//*********************************************CALL FUNCTIONS**********************************************//

function getVehicles() {
    getVehiclesApi(function (data) {

        var arr = JSON.parse(data);
        if (arr.length > 0) {
            $('#txtVechileNo').html('');
            $('#txtVechileNo').append('<option value="-1">-Select Vehicle-</option>');

            $.each(arr, function (index, item) {
                listOfReading.push(item.VehicleCurrentReading);
                $('#txtVechileNo').append('<option value="' + item.VehicleNumber + '">' + item.VehicleNumber + '</option>');
            });
        }
    });
}

function getDepots(){
    getDepotsApi(function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            $('#txtDepotCode').html('');
            $('#txtDepotCode').append('<option>-Select Depot-</option>');

            $.each(arr, function (index, item) {
                listOfDepotNames.push(item.DepotName);
                $('#txtDepotCode').append('<option value="' + item.DepotCode + '">' + item.DepotCode + '</option>');
            });
        }
    });
}

function getDrivers() {
    getDriversApi(function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            $('#txtDrivers').html('');
            $('#txtDrivers').append('<option>-Select Driver-</option>');

            $.each(arr, function (index, item) {
                $('#txtDrivers').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
            });
        }
    });
}

function getUnloadSites() {
    var d = new $.Deferred();
    getUnloadSitesApi(function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            $.each(arr, function (index, item) {
                listOfUnloadSites.push(item);
            });
            d.resolve();
        }
    });
    return d.promise();
}

function submitDailyReport() {

    $('input[type="number"]').each(function () {
        var nan = $(this).val();
        if (isNaN(nan) || !jQuery.isNumeric(nan)) {
            $(this).val(0)
        }
    });

    //Basic info
    var date = $('#txtDate').val();
    var vehicleNo = $('#txtVechileNo').val();
    var vcm = $('#txtVCM').val();
    var drivers = $('#txtDrivers').val();
    //Depot details
    var depotCode = $('#txtDepotCode').val();
    var sup = $('#txtSUP').val();
    var hsd = $('#txtHSD').val();
    //Difference details
    var supDropoff = $('#txtSUPDropoff').val();
    var supRate = $('#txtRateSup').val();
    var supQuantity = $('#txtQuantitySup').val();
    var hsdDropoff = $('#txtHSDDropoff').val();
    var hsdRate = $('#txtRateHsd').val();
    var hsdQuantity = $('#txtQuantityHsd').val();
    //Expenses
    var tool = $('#txtToolExp').val();
    var munshi = $('#txtMunshiExp').val();
    var parking = $('#txtParkingExp').val();
    var guard = $('#txtGuardExp').val();
    var meal = $('#txtMealExp').val();
    var other = $('#txtOtherExp').val();
    //FILLING
    var fuelRate = $('#txtRateLubeFuel').val();
    var fuelQty = $('#txtQuantityLubeFuel').val();
    //CLOSING
    var openMeter = $('#txtOpeningMeter').val();
    var closeMeter = $('#txtClosingMeter').val();

    if(date == "" ){
        alert("Please select a date.")
        return
    }
    else if (vehicleNo == -1 || vehicleNo == "-1") {
        alert("Please select a vehicle.")
        return
    }
    else if(isNaN(depotCode)){
        alert("Please select a depot.")
        return
    }
    else if (isNaN(drivers)) {
        alert("Please select a driver.")
        return
    }
    else if (openMeter == 0 || closeMeter == 0) {
        alert("Opening and closing meter are mandatory.")
        return
    }

    listOfSales = [];

    $.each(listOfRowIds, function (index, item) {
        var obj = {};
        var i = 0;
        $('#' + item + ' input').each(function () {
            if(i == 0)
            {
                obj["DeliveryNo"] = $(this).val();
            }
            else if (i == 1)
            {
                obj["Quantity"] = $(this).val();
            }
            else if (i == 2)
            {
                obj["SiteID"] = parseInt($(this).val());
            }
            else if (i == 3)
            {
                readImage(this).done(function (base64Data) {
                    obj["SaleReceiptImage"] = base64Data;
                });;
            }
            i++;
        });
        listOfSales.push(obj);
    });

    var json = {
        "Date": date,
        "VehicleNumber": vehicleNo,
        "DriverID": parseInt(drivers),
        "VCM": vcm,
        "DepotID": parseInt(depotCode),
        "PurchasedSUP": parseInt(sup),
        "PurchasedHSD": parseInt(hsd),
        "SUPDropOff": supDropoff,
        "SUPDifferenceRate": parseFloat(supRate),
        "SUPDifferenceQuantity": parseFloat(supQuantity),
        "HSDDropOff": hsdDropoff,
        "HSDDifferenceRate": parseFloat(hsdRate),
        "HSDDifferenceQuantity": parseFloat(hsdQuantity),
        "ToolExpense":parseInt(tool), 
        "MunshiExpense":parseInt(munshi),
        "ParkingExpense":parseInt(parking),
        "GuardExpense":parseInt(guard),
        "MealExpense":parseInt(meal),
        "OtherExpense": parseInt(other),
        "FilledFuelRate": parseFloat(fuelRate),
        "FilledFuelQuantity": parseFloat(fuelQty),
        "OpeningMeter":parseInt(openMeter),
        "ClosingMeter": parseInt(closeMeter),
        "PetrolAverage": 0,
        "DailyReportSales": listOfSales
    };

    window.setTimeout(function () {

        swal({
            title: "Are you sure ?",
            text: "Make sure you have entered each data carefully.",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            submitDailyReportApi(json, function (data) {
                if (data == "1") {
                    swal({
                        title: "Success",
                        text: "Report submitted",
                        type: "success",
                        confirmButtonText: "Ok"
                    }, function (isConfirm) {
                        if (isConfirm) {
                            window.location.href = window.location.href;
                        }
                    });
                }
                else {
                    swal("Error", data, "error");
                }
            });
        });
        
        
         
    }, 500);
}

//*********************************************END CALL FUNCTIONS**********************************************//