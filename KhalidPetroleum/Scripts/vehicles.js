$(document).ready(function () {
    getVehicles();
});

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
                table.row.add([
                    index + 1,
                    item.VehicleNumber,
                    item.VehicleModel,
                    item.VehicleCompany,
                    item.VehicleType,
                    item.VehicleCurrentReading,
                    '<button type="button" class="btn bg-light-blue waves-effect">Edit</button>'
                ]).draw();
            });
        }
    });
}