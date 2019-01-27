$(document).ready(function () {
    getVehicles();
});

var vehiclesList = [];

function addVehicle() {

    var number = $('#txtVehicleNumber').val();
    var model = $('#txtVehicleModel').val();
    var type = $('#txtVehicleType').val();
    var company = $('#txtVehicleCompany').val();
    var reading = $('#txtVehicleReading').val();

    var numberRegex = new RegExp(/([A-Z]+)\-\d+/);

    var json = {
        "VehicleNumber": number,
        "VehicleModel": model,
        "VehicleCompany": company,
        "VehicleType": type,
        "VehicleCurrentReading": reading,
        "Status": 1
    }

    addVehicleApi(JSON.stringify(json), function (data) {
        if (data == "1") {
            alert("Successfully added !");
            $('#txtVehicleNumber').val('');
            $('#txtVehicleModel').val('');
            $('#txtVehicleType').val($('#txtVehicleType option:eq(0)').val());
            $('#txtVehicleOwner').val('');
            $('#txtVehicleCompany').val('');
            $('#txtVehicleReading').val('');
            getVehicles();
        }
        else {
            alert(number + " already added.");
        }
    });
}

function getVehicles() {
    var table = $('#vehicleTable').DataTable();
    getVehiclesApi(function (data) {

        var arr = JSON.parse(data);
        if (arr.length > 0) {
            table.clear().draw();
            $.each(arr, function (index, item) {
                vehiclesList.push(item);
                table.row.add([
                    index + 1,
                    item.VehicleNumber,
                    item.VehicleModel,
                    item.VehicleCompany,
                    item.VehicleType,
                    item.VehicleCurrentReading,
                    '<button type="button" class="btn bg-light-blue waves-effect" onclick="editVehicle(\'' + item.VehicleNumber + '\')">Edit</button>'
                ]).draw();
            });
        }
    });
}

function editVehicle(number) {
    var item = null;
    for (var i = 0; i < vehiclesList.length; i++) {
        if (vehiclesList[i].VehicleNumber == number) {
            item = vehiclesList[i];
            break;
        }
    }
    $('#txtVehicleNumber1').val(item.VehicleNumber);
    $('#txtVehicleModel1').val(item.VehicleModel);
    $('#txtVehicleType1').val(item.VehicleType);
    $('#txtVehicleCompany1').val(item.VehicleCompany);
    $('#txtVehicleReading1').val(item.VehicleCurrentReading);

    $('#mdModal').modal('show');
}

function updateVehicle() {
    var body = {
        VehicleNumber: $('#txtVehicleNumber1').val(),
        VehicleModel: $('#txtVehicleModel1').val(),
        VehicleType: $('#txtVehicleType1').val(),
        VehicleCompany: $('#txtVehicleCompany1').val(),
        VehicleCurrentReading: $('#txtVehicleReading1').val()
    }

    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait !</strong>...</div>')
    updateVehicleApi(body, function (data) {
        if (data == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> Vehicle has been updated</div>');
            setTimeout(function () {

                window.location.href = window.location.href;

            }, 1500);
        }
        else {
            $('#alertdiv').html('<div class="alert alert-danger"><strong>Error !</strong> Something went wrong. Try again later</div>');
            setTimeout(function () {

                $('#alertdiv').html('');

            }, 1500);
        }
    });
}