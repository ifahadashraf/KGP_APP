$(document).ready(function () {
    getVehicles();
    getDepots();
    getDrivers();
    getUnloadSites();

    $('input[type=file]').change(function () {
        alert("hola");
    });

    $('.dynamic_input_file').change(function (e) {
        var file = e.target.files[0];
        var img = this;
        $.canvasResize(file, {
            width: 300,
            height: 0,
            crop: false,
            quality: 80,
            //rotate: 90,
            callback: function (data, width, height) {
                $(img).attr('src', data);
            }
        });
    });
});

var listOfReading = [];
var listOfRowIds = [];
var listOfDepotNames = [];
var listOfUnloadSites = [];
var skip = false;

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
                                            '<select id="txtUnloadSite" class="form-control" onchange="setHidden(this,\'inp'+currentTime+'\')"><option value="-1">-Select Site-</option>';
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
                                            '<input type="file" id="fileUpload" class="form-control dynamic_input_file" placeholder="" accept="image/jpeg">' +
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
                                    '<select id="txtUnloadSite" class="form-control" onchange="setHidden(this,\'inp' + currentTime + '\')"><option value="-1">-Select Site-</option>';
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
                                    '<input type="file" id="fileUpload" class="form-control dynamic_input_file" placeholder="" accept="image/jpeg">' +
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
            $('#txtDepotCode').append('<option value="-1">-Select Depot-</option>');

            $.each(arr, function (index, item) {
                listOfDepotNames.push(item.DepotName);
                $('#txtDepotCode').append('<option value="' + item.DepotCode + '">' + item.DepotCode + '</option>');
            });
        }
    });
}

function getDrivers() {
    getUsersApi(function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {

            $('#txtDrivers').html('');
            $('#txtDrivers').append('<option value="-1">Please select</option>');

            $('#txtVCM').html('');
            $('#txtVCM').append('<option value="-1">Please select</option>');

            $.each(arr, function (index, item) {
                if (item.UserType == "CAPTAIN")
                    $('#txtDrivers').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
                else if(item.UserType == "VCM")
                    $('#txtVCM').append('<option value="' + item.UserID + '">' + item.UserName + '</option>');
            });

            $('.page-loader-wrapper').css('display', 'none');

        }
    });
}

function getUnloadSites() {
    getUnloadSitesApi(function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            $.each(arr, function (index, item) {
                listOfUnloadSites.push(item);
            });
            addNewSalesRow();
        }
    });
}

function submitDailyReport() {

    
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
        alert("Please select a date")
        return
    }
    else if (vehicleNo == "-1") {
        alert("Please select a vehicle")
        return
    }
    else if (vcm == "-1") {
        alert("Please select a vehicle")
        return
    }
    else if(depotCode == "-1"){
        alert("Please select a depot")
        return
    }
    else if (drivers == "-1") {
        alert("Please select a driver.")
        return
    }
    else if (openMeter == 0 || closeMeter == 0) {
        alert("Opening and closing meter are mandatory.")
        return
    }
    else if (sup == "" && hsd == "") {
        alert("Kindly enter quantity SUP or HSD");
        return
    }
    else if (sup == "") {
        if (hsdRate == "" || hsdQuantity == "") {
            alert("Kindly difference rate and quantity of HSD");
            return
        }
    }
    else if (hsd == "") {
        if (supRate == "" || supQuantity == "") {
            alert("Kindly difference rate and quantity of SUP");
            return
        }
    }
    else if (sup != "" && hsd != "") {
        if (hsdRate == "" || hsdQuantity == "" || supRate == "" || supQuantity == "") {
            alert("Kindly difference rate and quantity of HSD and SUP");
            return
        }
    }

    listOfSales = [];

    $.each(listOfRowIds, function (index, item) {
        var obj = {};
        var i = 0;
        skip = false;
        $('#' + item + ' input').each(function () {
            if(i == 0)
            {
                if ($(this).val() == "") {
                    listOfSales = [];
                    skip = true;
                    return;
                }
                obj["DeliveryNo"] = $(this).val();
            }
            else if (i == 1)
            {
                if ($(this).val() == "") {
                    listOfSales = [];
                    skip = true;
                    return;
                }
                obj["Quantity"] = $(this).val();
            }
            else if (i == 2)
            {
                if (isNaN(parseInt($(this).val())) || $(this).val() == "-1") {
                    listOfSales = [];
                    skip = true;
                    return;
                }
                obj["SiteID"] = parseInt($(this).val());
            }
            else if (i == 3)
            {
                if (this.files.length == 0) {
                    listOfSales = [];
                    skip = true;
                    return;
                }
                readImage(this).done(function (base64Data) {
                    obj["SaleReceiptImage"] = base64Data;
                });;
            }
            i++;
        });
        if (skip)
            return;
        listOfSales.push(obj);
    });

    if (skip) {
        alert("A SALE field is empty or insufficient images attached");
        return
    }

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