$(document).ready(function () {
	getVehicles()
});

$(document).on("click", ".expand_report", function () {
	var report = list_reports[parseInt(this.id)];
	var date = new Date(report.Date);
	dateStr = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() - 100) +
        " [" + (date.getHours() <= 9 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds()) + "]";
	$('#txtDate').val(dateStr);
	$('#txtFB').val(report.UserName);
	$('#txtVN').val(report.VehicleNumber);
	$('#txtR').val(report.OpeningReading);
	
	$('#questionsTable').html('');
	$.each(report.list, function (index, item) {
		
		var html = '<tr>' +
			'<th scope="row">'+(index+1)+'</th>' +
			'<td>' + item.question + '</td>' +
			'<td>' +
				'<input name="group' + index + '" type="radio" id="radio_' + index + '1" class="with-gap radio-col-green" ' + ((item.status) ? 'checked' : '') + ' disabled/><label for="radio_' + index + '1"></label>' +
				'<input name="group' + index + '" type="radio" id="radio_' + index + '2" class="with-gap radio-col-red" ' + ((!item.status) ? 'checked' : '') + ' disabled/><label for="radio_' + index + '2"></label>' +
			'</td>' +
		'</tr>';
		
		$('#questionsTable').append(html);

	});
});

var list_reports = [];

function getChecklistReports() {

	var from = $('#txtFromDate').val();
	var to = $('#txtToDate').val();
	var vehicleNumber = $('#txtVechileNo').val();

	if (from != "" && to != "" && vehicleNumber != -1) {

		var table = $('#reportTable').DataTable();

		swal({
			title: "Sure? It might take 10-15 secs",
			text: "Wanna fetch report from " + from + " to " + to + " ?",
			type: "info",
			showCancelButton: true,
			closeOnConfirm: false,
			showLoaderOnConfirm: true,
		}, function () {
			getVehicleChecklists(from, to, vehicleNumber, function (data) {
				var arr = JSON.parse(data);

				if (arr.length > 0) {
					list_reports = [];
					table.clear().draw();
					$.each(arr, function (index, item) {
					    list_reports.push(item);
					    var date = new Date(item.Date);
					    dateStr = (date.getDate() <= 9 ? "0" + date.getDate() : date.getDate()) + '/' + ((date.getMonth() + 1) <= 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)) + '/' + (date.getYear() - 100);
					    //dateStr = date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getYear() - 100);
					    var timeStr = " [" + (date.getHours() <= 9 ? "0" + date.getHours() : date.getHours()) + ":" + (date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()) + ":" + (date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds()) + "]";
						table.row.add([
							(index+1),
                            dateStr,
                            item.VehicleNumber,
                            '<div class="row"><div class="col-md-6"><button type="button" class="btn bg-light-blue waves-effect expand_report" data-toggle="modal" data-target="#mdModal" id=' + index + '>View report</button></div> <div class="col-md-6"><button type="button" class="btn bg-light-blue waves-effect" data-toggle="modal" data-target="#galleryModal" onclick="makeTiles(' + index + ')">Images</button></div></div>'
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
		alert("Dates and vehicle number are mandatory.")
	}

}

function getVehicles() {
	getVehiclesApi(function (data) {

		var arr = JSON.parse(data);
		if (arr.length > 0) {
			$('#txtVechileNo').html('');
			$('#txtVechileNo').append('<option value="-1">-Select Vehicle-</option>');

			$.each(arr, function (index, item) {
			    if (item.VehicleType == "TANKER") {
			        $('#txtVechileNo').append('<option value="' + item.VehicleNumber + '">' + item.VehicleNumber + '</option>');
			    }
				
			});
		}
	});
}


function viewSales(id) {
	swal({
		title: "Sales Details",
		text: '<p>' + id + '</p>',
		html: true
	});
}

function makeTiles(id) {
	$('#aniimated-thumbnials').html('');
	getReportImagesApi(id, function (data) {
		var arr = JSON.parse(data);
		if (arr.length > 0) {
			$.each(arr, function (index, item) {
				$('#aniimated-thumbnials').
                    append('<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">' +
                                '<a href="../../Content/images/' + item.SaleReceiptImage + '" data-sub-html="Demo Description">' +
                                    '<img class="img-responsive thumbnail" src="../../Content/images/' + item.SaleReceiptImage + '">' +
                                '</a>' +
                           '</div>');
			});
			$('#aniimated-thumbnials').lightGallery({
				thumbnail: true,
				selector: 'a'
			});
		}
		else {
			$('#aniimated-thumbnials').html('<h4>No images attached</h4>');
		}
	});

}