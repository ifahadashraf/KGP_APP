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
var UPDATE_DAILY_REPORT_STATUS = "UpdateDailyReportStatus";
var GET_USERS_ACTIVE_TASKS = "GetUserPendingTasks";
var GET_GROUPS_ACTIVE_TASKS = "GetGroupPendingTasks";
var GET_USER_PENDING_TASKS = "GetUserPendingTasksByUserId";
var GET_GROUP_PENDING_TASKS = "GetGroupPendingTasksByGroupId";
var GET_GROUPS = "GetGroups";
var SUBMIT_NEW_TASK = "SubmitNewTasks";
var GET_QUESTIONS = "GetQuestions";
var ADD_QUESTIONS = "AddQuestion";
var UPDATE_QUESTION = "UpdateQuestion";
var SUBMIT_GROUPS = "SubmitGroups";
var GET_GROUP_MEMBERS = "GetGroupMembers";
var GET_MY_GROUPS = "GetMyGroups";
var GET_ALL_TASKS = "GetAllTasks";
var DELETE_ROLE = "DeleteRole";
var DELTE_USER = "DeleteUser";
var ADD_DEPOT = "AddDepot";
var GET_MONTHLY_REPORT = "GetMonthlyReport"

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

function updateDailyReportStatusApi(id, status, cb) {
    $.ajax({
        url: BASE_URL + UPDATE_DAILY_REPORT_STATUS + "?id=" + id + "&status=" + status,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getUsersActiveTasks(cb) {
    $.ajax({
        url: BASE_URL + GET_USERS_ACTIVE_TASKS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getGroupsActiveTasks(cb) {
    $.ajax({
        url: BASE_URL + GET_GROUPS_ACTIVE_TASKS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getUserPendingTasks(id, cb) {
    $.ajax({
        url: BASE_URL + GET_USER_PENDING_TASKS + "?userid=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}


function getGroupPendingTasks(id, cb) {
    $.ajax({
        url: BASE_URL + GET_GROUP_PENDING_TASKS + "?groupid=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getGroupsApi(cb) {
    $.ajax({
        url: BASE_URL + GET_GROUPS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function submitNewTasksApi(body, cb) {
    $.ajax({
        url: BASE_URL + SUBMIT_NEW_TASK,
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

function getQuestionsApi(cb) {
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

function addQuestionApi(body, cb) {
    $.ajax({
        url: BASE_URL + ADD_QUESTIONS,
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

function updateQuestionApi(body, cb) {
    $.ajax({
        url: BASE_URL + UPDATE_QUESTION,
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

function submitGroupsApi(body, cb) {
    $.ajax({
        url: BASE_URL + SUBMIT_GROUPS,
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

function getMembersApi(id, cb) {
    $.ajax({
        url: BASE_URL + GET_GROUP_MEMBERS + "?groupid=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getMyGroups(id, cb) {
    $.ajax({
        url: BASE_URL + GET_MY_GROUPS + "?userid=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function getAllTasks(cb) {
    $.ajax({
        url: BASE_URL + GET_ALL_TASKS,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function deleteRoleApi(id, cb) {
    $.ajax({
        url: BASE_URL + DELETE_ROLE + "?id=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function deleteUserApi(id, cb) {
    $.ajax({
        url: BASE_URL + DELTE_USER + "?id=" + id,
        method: "GET",
        success: function (data) {
            cb(data);
        },
        error: function (data) {
            cb(data);
        }
    });
}

function addDepotApi(body, cb) {
    $.ajax({
        url: BASE_URL + ADD_DEPOT,
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

function getMonthlyReportApi(from, to, cb) {
    $.ajax({
        url: BASE_URL + GET_MONTHLY_REPORT + '?from=' + from + '&to=' + to,
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
