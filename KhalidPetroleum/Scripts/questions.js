$(document).ready(function () {
    getQuestions();
    $('#siteTable tbody').on('click', 'button', function () {

        var table = $('#siteTable').DataTable();
        var data = table.row($(this).parents('tr')).data();

        $('#txtSiteCodeu').val(data[0]);
        $('#txtSiteNameu').val(data[1]);
        if (data[2] == 'Active') {
            $('#txtParentCompanyu').get(0).selectedIndex = 1;
        }
        else {
            $('#txtParentCompanyu').get(0).selectedIndex = 2;
        }
        $('#mdModal').modal('show');
    });
});

function addQuestion() {

    var name = $('#txtSiteName').val();
    var status = $('#txtParentCompany').val();

    if (name == "") {
        alert("Question cannot be empty");
        return;
    }
    else if (parent == "-1") {
        alert("Please select a status");
        return;
    }

    var json = {
        "QuestionStatement": name,
        "Status": (status == '1') ? true : false
    }

    addQuestionApi(json, function (data) {
        if (data == "1") {
            alert("Added Successfully !")
        }
        else {
            alert("Something went wrong. Contact Admin");
        }
    });

}

function getQuestions() {

    var table = $('#siteTable').DataTable();

    getQuestionsApi(function (data) {

        var arr = JSON.parse(data);

        if (arr.length > 0) {
            table.clear().draw();
            $.each(arr, function (index, item) {
                var status = '';
                if (item.Status == true) {
                    status = 'Active';
                }
                else {
                    status = 'Deactive';
                }
                table.row.add([
                    item.QuestionID,
                    item.QuestionStatement,
                    status,
                    '<input type="text" style="display:none" value="' + item.ParentCompany + '"><button type="button" class="btn bg-light-blue waves-effect">Edit</button>'
                ]).draw();
            });
        }
    });
}

function updateQuestion() {

    $('#alertdiv').html('<div class="alert alert-info"><strong>Please wait...</div>')

    var siteid = $('#txtSiteCodeu').val();
    var name = $('#txtSiteNameu').val();
    var parent = $('#txtParentCompanyu').val();

    var json = {
        "QuestionID": parseInt(siteid),
        "QuestionStatement": name,
        "Status": (parent == '1') ? true : false
    }

    updateQuestionApi(json, function (data) {
        if (data == "1") {
            $('#alertdiv').html('<div class="alert alert-success"><strong>Success !</strong> New task has been added</div>')
            setTimeout(function () {

                window.location.href = window.location.href;

            }, 1500);
        }
        else {
            alert("Something went wrong. Contact Admin");
        }
    });
}