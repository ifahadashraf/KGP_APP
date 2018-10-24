$(document).ready(function () {
    getVehicles();
    getQuestions();

    Dropzone.autoDiscover = false;
    $("#frmFileUpload").dropzone({
        url: "../../Data/ProcessRequest",
        addRemoveLinks: true,
        success: function (file, response) {
            var imgName = response;
            file.previewElement.classList.add("dz-success");
            list_of_images.push(imgName);
        },
        removedfile : function(file){
            $.ajax({
                url: "../../Data/" + "DeleteFile" + "?filename=" + file.name,
                method: "GET",
                success: function (data) {
                    if (data == "1")
                    {
                        $('.dz-preview').remove();
                        return true;
                    }
                    alert(data);
                    return false;
                },
                error: function (data) {
                    alert("Err : " + data);
                    return false;
                }
            });
        },
        error: function (file, response) {
            file.previewElement.classList.add("dz-error");
        }
    });
});

var list_of_images = [];

function getVehicles() {
    getVehiclesApi(function (data) {

        var arr = JSON.parse(data);
        if (arr.length > 0)
        {
            $('#txtVechileNo').html('');
            $('#txtVechileNo').append('<option>-Select Vehicle-</option>');

            $.each(arr, function (index, item) {
                $('#txtVechileNo').append('<option value="'+item.VehicleNumber+'">'+item.VehicleNumber+'</option>');
            });
        }
    });
}

function getQuestions() {
    getQuestionsApi(function (data) {
        var arr = JSON.parse(data);
        if (arr.length > 0) {
            $('#questionsTable').html('');
            $.each(arr, function (index, item) {
                $('#questionsTable').append('<tr>'+
                                                '<th scope="row">'+item.QuestionID+'</th>'+
                                                '<td>'+item.QuestionStatement+'</td>'+
                                                '<td>'+
                                                    '<input name="group'+index+'" type="radio" id="radio0'+index+'" class="with-gap radio-col-green" value="1" /><label for="radio0'+index+'"></label>'+
                                                    '<input name="group'+index+'" type="radio" id="radio1' + index + '" class="with-gap radio-col-red" value="0" checked /><label for="radio1'+index+'"></label>' +
                                                '</td>'+
                                            '</tr>');
            });
        }
    });
}

function submitCheckList()
{
    var date = $('#txtDate').val();
    var vehicle = $('#txtVechileNo').val();
    var captainName = $('#txtCaptainName').val();
    var openingMeter = $('#txtOpeningMeter').val();


    var checkList = [];

    $('#questionsTable tr').each(function (i, eachrow) {
        var row = $(eachrow);
        var questionID = row[0].cells[0].childNodes[0].data;
        var status = $("input:radio[name='group"+i+"']:checked").val();
        
        checkList.push({
            "questionID": questionID,
            "status": (status == "1")
        });
    });

    var json = {
        "Date": date,
        "DriverName": captainName,
        "OpeningReading": parseInt(openingMeter),
        "VehicleNumber": vehicle,
        "ListOfImages" : list_of_images,
        "list":checkList
    };

    submitChecklistApi(json, function (data) {
        if(data == "1")
        {
            alert("Report submitted successfully !");
        }
        else
        {
            alert("Something went wrong. Contact Admin.");
        }
    });

}