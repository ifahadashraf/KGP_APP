var myDropZone = null;

$(document).ready(function () {
    getVehicles();
    getQuestions();

    Dropzone.options.frmFileUpload = {
        acceptedFiles: "image/*",
        capture: "camera",
        init: function () {
            this.on("addedfile", function (origFile) {
                var MAX_WIDTH = 800;
                var MAX_HEIGHT = 600;

                var reader = new FileReader();

                // Convert file to img

                reader.addEventListener("load", function (event) {

                    var origImg = new Image();
                    origImg.src = event.target.result;

                    origImg.addEventListener("load", function (event) {

                        var width = event.target.width;
                        var height = event.target.height;


                        // Don't resize if it's small enough

                        if (width <= MAX_WIDTH && height <= MAX_HEIGHT) {
                            dropzone.enqueueFile(origFile);
                            return;
                        }


                        // Calc new dims otherwise

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }


                        // Resize

                        var canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;

                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(origImg, 0, 0, width, height);

                        var resizedFile = base64ToFile(canvas.toDataURL(), origFile);


                        // Replace original with resized

                        var origFileIndex = myDropZone.files.indexOf(origFile);
                        myDropZone.files[origFileIndex] = resizedFile;


                        // Enqueue added file manually making it available for
                        // further processing by dropzone

                        myDropZone.enqueueFile(resizedFile);
                    });
                });

                reader.readAsDataURL(origFile);
            });
        }
    };

    Dropzone.autoDiscover = false;

    myDropZone = new Dropzone("#frmFileUpload", {
        url: "../../Data/ProcessRequest",
        addRemoveLinks: true,
        autoQueue: false,
        success: function (file, response) {
            var imgName = response;
            file.previewElement.classList.add("dz-success");
            list_of_images.push(imgName);
        },
        canceled: function (file) {
            $('.dz-preview').remove();
            return true;
        },
        removedfile: function (file) {
            $.ajax({
                url: "../../Data/" + "DeleteFile" + "?filename=" + file.name,
                method: "GET",
                success: function (data) {
                    $(file.previewElement).remove();
                    removeFromList(file.name);
                },
                error: function (data) {
                    alert("Err : " + data);
                    file.previewElement.classList.add("dz-error");
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

var list_of_vehicles = [];

function getVehicles() {
    getVehiclesApi(function (data) {

        var arr = JSON.parse(data);
        if (arr.length > 0)
        {
            $('#txtVechileNo').html('');
            $('#txtVechileNo').append('<option value="-1">-Select Vehicle-</option>');

            $.each(arr, function (index, item) {
                list_of_vehicles.push(item);
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

            $('.page-loader-wrapper').css('display', 'none');
        }
    });
}

function submitCheckList()
{
    var date = $('#txtDate').val();
    var vehicle = $('#txtVechileNo').val();
    var captainName = $('#txtCaptainName').val();
    var openingMeter = $('#txtOpeningMeter').val();
    var currentReading = findReading(vehicle);

    if (date == '') {
        alert("Please enter a date");
        return
    }
    else if (vehicle == "-1"){
        alert("Please select a vehicle");
        return
    }
        
    else if (parseInt(openingMeter) <= parseInt(currentReading)) {
        alert("Wrong opening meter\n\nValue should be greater than current reading");
        return
    }

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

    var tasks = [];

    for (var i = 1; i <= 5; i++) {
        var val = $('#task_' + i).val();
        if (val != '') {
            tasks.push(val);
        }
    }

    var json = {
        "Date": date,
        "DriverName": captainName,
        "OpeningReading": parseInt(openingMeter),
        "VehicleNumber": vehicle,
        "ListOfImages" : list_of_images,
        "list": checkList,
        "tasks" : tasks
    };

    if (list_of_images.length == myDropZone.files.length)
    {
        swal({
            title: "Are you sure ?",
            text: "Make sure you have entered each data carefully.",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            submitChecklistApi(json, function (data) {
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
    }
    else {
        alert("Images still uploading. Try again");
    }
}


function base64ToFile(dataURI, origFile) {
    var byteString, mimestring;

    if (dataURI.split(',')[0].indexOf('base64') !== -1) {
        byteString = atob(dataURI.split(',')[1]);
    } else {
        byteString = decodeURI(dataURI.split(',')[1]);
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];

    var content = new Array();
    for (var i = 0; i < byteString.length; i++) {
        content[i] = byteString.charCodeAt(i);
    }

    var newFile = new File(
      [new Uint8Array(content)], origFile.name, { type: mimestring }
    );


    // Copy props set by the dropzone in the original file

    var origProps = [
      "upload", "status", "previewElement", "previewTemplate", "accepted"
    ];

    $.each(origProps, function (i, p) {
        newFile[p] = origFile[p];
    });

    return newFile;
}


function findReading(number) {
    var val = '';
    $.each(list_of_vehicles, function (index, item) {
        if (item.VehicleNumber == number) {
            val = item.VehicleCurrentReading;
            return;
        }
    });

    return val;
}

function removeFromList(filename) {
    for (var i = 0; i < list_of_images.length; i++) {
        if (list_of_images[i].indexOf(filename) != -1)
            list_of_images.splice(i, 1);
    }
}