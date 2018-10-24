$(document).ready(function () {
    
});

function getRents() {

    var from = $('#txtFromDate').val();
    var to = $('#txtToDate').val();

    var table = $('#rentTable').DataTable();

    getRentsApi(from, to, function (data) {
        table.clear().draw();
        var arr = JSON.parse(data);
        $.each(arr, function (index, item) {

            if (item.ParentCompany == 1)
            {
                table.row.add([
                    index + 1,
                    'Khalid Group of Petroleum',
                    item.TotalRent,
                    0,
                    0,
                    '<button type="button" class="btn bg-light-blue waves-effect expand_report" data-toggle="modal" data-target="#mdModal" onclick="viewRentDetails(1)">View all</button>'
                ]).draw();
            }
            else if(item.ParentCompany == 2)
            {
                table.row.add([
                    index + 1,
                    'Khalid Service Station',
                    item.TotalRent,
                    0,
                    0,
                    '<button type="button" class="btn bg-light-blue waves-effect expand_report" data-toggle="modal" data-target="#mdModal" onclick="viewRentDetails(2)">View all</button>'
                ]).draw();
            }
            else
            {
                table.row.add([
                    index + 1,
                    'Raiwind Filling Station',
                    item.TotalRent,
                    0,
                    0,
                    '<button type="button" class="btn bg-light-blue waves-effect expand_report" data-toggle="modal" data-target="#mdModal" onclick="viewRentDetails(3)">View all</button>'
                ]).draw();
            }
        });
    });
}

function viewRentDetails(id) {

    var from = $('#txtFromDate').val();
    var to = $('#txtToDate').val();
    $('#modal-body').html('');

    var html = '<table class="table table-bordered"><thead><td>Date&nbsp&nbsp</td><td>D/No</td><td>SiteCode</td><td>Name</td><td>SoldQty</td><td>NetRent</td><td>Image</td></thead><tbody>';

    getRentDetailsApi(id, from, to, function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            $.each(arr, function (i, item) {
                html += '<tr><td>' + item.Date.split('T')[0] + '</td>';
                html += '<td>' + item.DeliveryNo + '</td>';
                html += '<td>' + item.SiteID + '</td>';
                html += '<td>' + item.SiteName + '</td>';
                html += '<td>' + item.Quantity + '</td>';
                html += '<td>' + item.Total_Rent + '</td>';
                html += '<td><a id="single_image" href="http://kgp.azurewebsites.net/Content/images/' + item.SaleReceiptImage + '" target="_blank"><img src="http://kgp.azurewebsites.net/Content/images/' + item.SaleReceiptImage + '" alt="" height="50" width="50"/></a></td></tr>';
            });
            html += '</tbody></table>';
            $('.modal-body').html(html);
        }
    });
}