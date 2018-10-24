$(document).ready(function () {
    getUnloadSites();
    $('#siteTable tbody').on('click', 'button', function () {

        var table = $('#siteTable').DataTable();
        var data = table.row($(this).parents('tr')).data();

        $('#txtSiteCodeu').val(data[0]);
        $('#txtSiteNameu').val(data[1]);
        if ($('#txtParentCompanyu').val() == 'Khalid Group of Petroleum') {
            $('#txtParentCompanyu').get(0).selectedIndex = 1;
        }
        else if ($('#txtParentCompanyu').val() == 'Khalid Service Station') {
            $('#txtParentCompanyu').get(0).selectedIndex = 2;
        }
        else {
            $('#txtParentCompanyu').get(0).selectedIndex = 3;
        }
        $('#txtChargingRateu').val(data[3]);
        $('#txtSiteLocationu').val(data[2]);

        $('#mdModal').modal('show');
    });
});

function addUnloadSite() {

    var siteid = $('#txtSiteCode').val();
    var name = $('#txtSiteName').val();
    var parent = $('#txtParentCompany').val();
    var rate = $('#txtChargingRate').val();
    var location = $('#txtSiteLocation').val();

    if (siteid == "" || !siteid.match(/^\d+$/)) {
        alert("Site code should be numeric");
        return;
    }
    else if (name == "") {
        alert("Site name cannot be empty");
        return;
    }
    else if (parent == "-1") {
        alert("Please select a parent company");
        return;
    }
    else if (rate == "" || rate.match(/[a-zA-Z]/)) {
        alert("Rate should be float / numeric");
        return;
    }
    else if (location == "") {
        alert("Location cannot be empty");
        return;
    }

    var json = {
        "SiteID": parseInt(siteid),
        "SiteName": name,
        "SiteLocation": location,
        "ChargingRate": parseFloat(rate),
        "ParentCompany": parseInt(parent),
        "SiteStatus":true
    }

    addUnloadSiteApi(json, function (data) {
        if (data == "1") {
            alert("Added Successfully !")
        }
        else {
            alert("Something went wrong. Contact Admin");
        }
    });

}

function getUnloadSites() {

    var table = $('#siteTable').DataTable();

    getUnloadSitesApi(function (data) {

        var arr = JSON.parse(data);

        if (arr.length > 0) {
            table.clear().draw();
            $.each(arr, function (index, item) {
                var parent = '';
                if (item.ParentCompany == 1) {
                    parent = 'Khalid Group of Petroleum';
                }
                else if (item.ParentCompany == 2) {
                    parent = 'Khalid Service Station';
                }
                else {
                    parent = 'Raiwind Filling Station';
                }
                table.row.add([
                    item.SiteID,
                    item.SiteName,
                    item.SiteLocation,
                    item.ChargingRate,
                    parent,
                    '<input type="text" style="display:none" value="'+item.ParentCompany+'"><button type="button" class="btn bg-light-blue waves-effect">Edit</button>'
                ]).draw();
            });
        }
    });
}

function updateUnloadSite() {

    var siteid = $('#txtSiteCodeu').val();
    var name = $('#txtSiteNameu').val();
    var parent = $('#txtParentCompanyu').val();
    var rate = $('#txtChargingRateu').val();
    var location = $('#txtSiteLocationu').val();

    var json = {
        "SiteID": parseInt(siteid),
        "SiteName": name,
        "SiteLocation": location,
        "ChargingRate": parseFloat(rate),
        "ParentCompany": parseInt(parent),
        "SiteStatus": true
    }

    updateUnloadSiteApi(json, function (data) {
        if (data == "1") {
            alert("Updated Successfully !");
            getUnloadSites();
        }
        else {
            alert("Something went wrong. Contact Admin");
        }
    });
}