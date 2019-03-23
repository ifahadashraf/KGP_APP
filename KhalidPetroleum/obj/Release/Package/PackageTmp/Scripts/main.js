//****************CONSTANTS*****************//

var BASE_URL = "../../Data/";
var ADD_VEHICLE = "AddVehicle";
var GET_VEHICLES = "GetVehicles";
var GET_QUESTIONS = "GetQuestions";
var SUBMIT_CHECKLIST = "SubmitDailyChecklist";
var GET_DEPOTS = "GetDepots";
var GET_DRIVERS = "GetDrivers";
var SUBMIT_DAILYREPORT = "SubmitDailyReport";
var GET_UNLOAD_SITES = "GetUnloadSites";
var GET_RENTS = "GetRents";
var ADD_USER = "AddUser";
var GET_USERS = "GetUsers";
var GET_RENT_DETAILS = "GetRentDetails";
var ADD_UNLOAD_SITE = "AddUnloadSite";
var GET_UNLOAD_SITES = "GetUnloadSites";
var UPDATE_UNLOAD_SITE = "UpdateUnloadSite";
var GET_DAILY_REPORTS = "GetDailyReports";
var ADD_NEW_ROLE = "AddNewRole";
var ASSIGN_ROLE = "AssignRole";
var GET_ROLES = "GetRoles";
var UPDATE_ROLE = "UpdateRole";
var GET_REPORT_IMAGES = "GetReportImages";
var GET_TASKS_BY_USER_ID = "GetTasksByUserId";
var ADD_TASK = "AddTask";
var UPDATE_TASK = "UpdateTask";
var GET_VEHICLE_CHECKLISTS = "GetVehicleChecklists";
var UPDATE_VEHICLE = "UpdateVehicle";
var UPDATE_STAFF = "UpdateStaff";
var GET_CHECKLISTS = "GetChecklists";
var GET_MAINTENANCE_TASKS = "GetTasksByChecklistId";
var SUBMIT_APPROVAL = "SubmitApproval";
var GET_DAILY_REPORT_SALES = "GetDailyReportSales";

//*************END OF CONSTANTS*************//

//***************API FUNCTIONS*************//

function addVehicleApi(body,cb)
{
    $.ajax({
        url: BASE_URL + ADD_VEHICLE,
        method: "POST",
        data: body,
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getVehiclesApi(cb) {
    $.ajax({
        url: BASE_URL + GET_VEHICLES,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getQuestionsApi(cb)
{
    $.ajax({
        url: BASE_URL + GET_QUESTIONS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function submitChecklistApi(body,cb)
{
    $.ajax({
        url: BASE_URL + SUBMIT_CHECKLIST,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getDepotsApi(cb)
{
    $.ajax({
        url: BASE_URL + GET_DEPOTS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getDriversApi(cb) {
    $.ajax({
        url: BASE_URL + GET_DRIVERS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getUnloadSitesApi(cb) {
    $.ajax({
        url: BASE_URL + GET_UNLOAD_SITES,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function submitDailyReportApi(body, cb) {
    $.ajax({
        url: BASE_URL + SUBMIT_DAILYREPORT,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getRentsApi(from,to,cb)
{
    $.ajax({
        url: BASE_URL + GET_RENTS+'?from='+from+'&to='+to,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function addUserApi(body, cb) {
    $.ajax({
        url: BASE_URL + ADD_USER,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getUsersApi(cb) {
    $.ajax({
        url: BASE_URL + GET_USERS ,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getRentDetailsApi(id,from,to,cb) {
    $.ajax({
        url: BASE_URL + GET_RENT_DETAILS + "?parentid="+id+"&from="+from+"&to="+to,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function addUnloadSiteApi(body, cb) {
    $.ajax({
        url: BASE_URL + ADD_UNLOAD_SITE,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getUnloadSitesApi(cb) {
    $.ajax({
        url: BASE_URL + GET_UNLOAD_SITES,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function updateUnloadSiteApi(body, cb) {
    $.ajax({
        url: BASE_URL + UPDATE_UNLOAD_SITE,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getDailyReportsApi(from, to, cb) {
    $.ajax({
        url: BASE_URL + GET_DAILY_REPORTS + "?from=" + from + "&to=" + to,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function addNewRoleApi(body, cb) {
    $.ajax({
        url: BASE_URL + ADD_NEW_ROLE,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function assignRoleApi(userid, roleid, cb) {
    $.ajax({
        url: BASE_URL + ASSIGN_ROLE + "?userId=" + userid + "&roleId=" + roleid,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getRolesApi(cb) {
    $.ajax({
        url: BASE_URL + GET_ROLES,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function updateRoleApi(body, cb) {
    $.ajax({
        url: BASE_URL + UPDATE_ROLE,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getReportImagesApi(id,cb) {
    $.ajax({
        url: BASE_URL + GET_REPORT_IMAGES + "?id=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getTasksByUserId(id, cb) {
    $.ajax({
        url: BASE_URL + GET_TASKS_BY_USER_ID + "?id=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function addTaskApi(body, cb) {
    $.ajax({
        url: BASE_URL + ADD_TASK,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function updateTaskApi(body, cb) {
    $.ajax({
        url: BASE_URL + UPDATE_TASK,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getVehicleChecklists(fro, to, vn, cb) {
    $.ajax({
        url: BASE_URL + GET_VEHICLE_CHECKLISTS + "?from=" + fro + "&to=" + to + "&vehicleNumber=" + vn,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function updateVehicleApi(body, cb) {
    $.ajax({
        url: BASE_URL + UPDATE_VEHICLE,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function updateStaffApi(body, cb) {
    $.ajax({
        url: BASE_URL + UPDATE_STAFF,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getChecklistsApi(cb) {
    $.ajax({
        url: BASE_URL + GET_CHECKLISTS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getMaintenanceTasksApi(id, cb) {
    $.ajax({
        url: BASE_URL + GET_MAINTENANCE_TASKS + "?id="+id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function submitApprovalApi(body, cb) {
    $.ajax({
        url: BASE_URL + SUBMIT_APPROVAL,
        method: "POST",
        data: JSON.stringify(body),
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getDailyReportSalesApi(id, cb) {
    $.ajax({
        url: BASE_URL + GET_DAILY_REPORT_SALES + "?reportId=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}


//*******************END******************//
