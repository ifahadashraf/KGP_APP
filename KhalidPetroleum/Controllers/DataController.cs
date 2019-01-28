using KhalidPetroleum.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace KhalidPetroleum.Controllers
{
    public class DataController : Controller
    {
        KhalidOilDBEntities db = new KhalidOilDBEntities();

        [System.Web.Http.HttpPost]
        public String AddVehicle()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();
                Vehicle vehicle = JsonConvert.DeserializeObject<Vehicle>(requestFromPost);
                vehicle.VehicleNumber = string.Join(string.Empty, vehicle.VehicleNumber.Split(' '));
                db.Vehicles.Add(vehicle);
                db.SaveChanges();
                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [System.Web.Http.HttpGet]
        public String GetVehicles()
        {
            var list = db.Database.SqlQuery<Vehicle>("SELECT * FROM Vehicles").ToList<Vehicle>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpGet]
        public String GetQuestions()
        {
            var list = db.Database.SqlQuery<Question>("SELECT * FROM Questions").ToList<Question>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpPost]
        public String SubmitDailyChecklist()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();
                CheckListModel vehicle = JsonConvert.DeserializeObject<CheckListModel>(requestFromPost);

                db.DailyCheckLists.Add(new DailyCheckList
                {
                    VehicleNumber = vehicle.VehicleNumber,
                    Date = DateTime.Now,
                    Reading = "" + vehicle.OpeningReading,
                    FilledBy = vehicle.FilledBy
                });

                db.SaveChanges();

                var checkListID = db.DailyCheckLists.ToList().LastOrDefault().CheckListID;

                foreach (string img in vehicle.ListOfImages)
                {
                    var obj = new DailyCheckListImage();
                    obj.DailyCheckListId = (long)checkListID;
                    obj.ImageName = img;
                    db.DailyCheckListImages.Add(obj);
                }

                //if(vehicle.OpeningReading > long.Parse(selectedVehicle.VehicleCurrentReading))
                {
                    var v = db.Vehicles.Where<Vehicle>(x => x.VehicleNumber == vehicle.VehicleNumber).ToList<Vehicle>()[0]; 
                    v.VehicleCurrentReading = ""+vehicle.OpeningReading;
                }

                foreach (CheckListArray x in vehicle.list)
                {
                    CheckList_Question temp = new CheckList_Question();
                    temp.CheckListID = Convert.ToInt64(checkListID);
                    temp.QuestionID = x.questionID;
                    temp.Status = x.status;

                    db.CheckList_Question.Add(temp);
                }

                var OM = db.Users.Where(x => x.UserType == "OPERATIONS-MANAGER").ToList();

                foreach (String task in vehicle.tasks)
                {
                    db.Tasks.Add(new Task
                    {
                        TaskName = task,
                        Details = "",
                        StartDate = vehicle.Date,
                        EstimatedDate = vehicle.Date.AddDays(1),
                        TaskOwner = OM[0].UserID,
                        TaskStatus = "PENDING",
                        LastUpdate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time")),
                        DailyChecklistId = checkListID,
                        IsApproved = false
                    });
                }

                db.SaveChanges();
                return "1";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
            
        }

        [System.Web.Http.HttpGet]
        public String GetDepots()
        {
            var list = db.Database.SqlQuery<Depot>("SELECT * FROM Depots").ToList<Depot>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpGet]
        public String GetDrivers()
        {
            var list = db.Database.SqlQuery<User>("SELECT * FROM Users WHERE UserType = 'CAPTAIN'").ToList<User>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpGet]
        public String GetUnloadSites()
        {
            var list = db.Database.SqlQuery<UnloadSite>("SELECT * FROM UnloadSites").ToList<UnloadSite>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpPost]
        public String SubmitDailyReport()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                DailyReport report = JsonConvert.DeserializeObject<DailyReport>(requestFromPost);

                foreach(DailyReportSale s in report.DailyReportSales)
                {
                    if(s.SaleReceiptImage != null)
                    {
                        string imgName = DateTime.Now.Ticks + ".jpg";
                        string path = Path.Combine(Server.MapPath("~/Content/images"), imgName);
                        System.IO.File.WriteAllBytes(path, Convert.FromBase64String(s.SaleReceiptImage.Split(',')[1]));
                        s.SaleReceiptImage = imgName;
                    }
                }

                var vehicle = db.Vehicles.Where<Vehicle>(x => x.VehicleNumber == report.VehicleNumber).ToList<Vehicle>()[0];
                vehicle.VehicleCurrentReading = ""+report.ClosingMeter;

                db.DailyReports.Add(report);
                db.SaveChanges();

                return "1";
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }

        public static string GetFileExtension(string base64String)
        {
            var data = base64String.Substring(0, 5);

            switch (data.ToUpper())
            {
                case "IVBOR":
                    return "png";
                case "/9J/4":
                    return "jpg";
                case "AAAAF":
                    return "mp4";
                case "JVBER":
                    return "pdf";
                case "AAABA":
                    return "ico";
                case "UMFYI":
                    return "rar";
                case "E1XYD":
                    return "rtf";
                case "U1PKC":
                    return "txt";
                case "MQOWM":
                case "77U/M":
                    return "srt";
                default:
                    return string.Empty;
            }
        }

        private void SaveByteArrayAsImage(string fullOutputPath, string base64String)
        {
            byte[] bytes = Convert.FromBase64String(base64String);

            Image image;
            using (MemoryStream ms = new MemoryStream(bytes))
            {
                image = Image.FromStream(ms);
                image.Save(fullOutputPath);
            }
        }

        [System.Web.Http.HttpGet]
        public String GetRents(DateTime from, DateTime to)
        {
            var list = JsonConvert.SerializeObject(db.GET_PARENT_COMPANY_RENT_BY_DATE(to, from).ToList<GET_PARENT_COMPANY_RENT_BY_DATE_Result>());
            return list;
        }

        [System.Web.Http.HttpGet]
        public String GetRentDetails(int parentid,DateTime from, DateTime to)
        {
            var list = JsonConvert.SerializeObject(db.GET_SALES_HISTORY_BY_DATE(parentid,to,from).ToList<GET_SALES_HISTORY_BY_DATE_Result>());
            return list;
        }

        [System.Web.Http.HttpPost]
        public String AddUser()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                User user = JsonConvert.DeserializeObject<User>(requestFromPost);
                user.RoleID = 2;
                db.Users.Add(user);
                db.SaveChanges();

                return "1";
            }
            catch(Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpGet]
        public String GetUsers()
        {
            var list = db.GET_ALL_USERS().ToList<GET_ALL_USERS_Result>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpPost]
        public String AddUnloadSite()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                UnloadSite site = JsonConvert.DeserializeObject<UnloadSite>(requestFromPost);
                db.UnloadSites.Add(site);
                db.SaveChanges();

                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpPost]
        public String UpdateUnloadSite()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                UnloadSite site = JsonConvert.DeserializeObject<UnloadSite>(requestFromPost);
                var toUpdate = db.UnloadSites.Where(x => x.SiteID == site.SiteID).ToList<UnloadSite>()[0];
                toUpdate.SiteName = site.SiteName;
                toUpdate.SiteLocation = site.SiteLocation;
                toUpdate.ParentCompany = site.ParentCompany;
                toUpdate.ChargingRate = site.ChargingRate;
                db.SaveChanges();

                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpPost]
        public void VerifyLogin(String username, String password)
        {
            var len = db.Users.Where(x => x.Userusername.Equals(username) && x.UserPassword.Equals(password)).ToList<User>();
            if (len.Count > 0){
                var roleid = len[0].RoleID;
                var rights = db.Roles.Where(y => y.RoleID == roleid).ToList<Role>()[0];
                Session["User"] = len[0];
                Session["Username"] = len[0].UserName;
                Session["Email"] = len[0].UserEmail;
                Session["Rights"] = rights;
                Response.Redirect("~/Main/Index");
            }
            else{
                Session["user"] = null;
                Response.Redirect("~/Main/SignIn");
            }
        }

        [System.Web.Http.HttpGet]
        public string GetDailyReports(DateTime from, DateTime to)
        {
            var resp = new List<DailyReportModel>();

            var list = db.GET_DAILY_REPORT_BY_DATE(from, to).ToList<GET_DAILY_REPORT_BY_DATE_Result>();

            foreach (GET_DAILY_REPORT_BY_DATE_Result report in list)
            {
                var sales = db.GET_SALES_BY_REPORT_ID(report.DailyReportID).ToList<GET_SALES_BY_REPORT_ID_Result>();
                resp.Add(new DailyReportModel(report, sales));
            }

            return JsonConvert.SerializeObject(resp);
        }

        [System.Web.Http.HttpPost]
        public String AddNewRole()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                Role role = JsonConvert.DeserializeObject<Role>(requestFromPost);

                db.Roles.Add(role);
                db.SaveChanges();

                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpPost]
        public String UpdateRole()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                Role role = JsonConvert.DeserializeObject<Role>(requestFromPost);

                var existingRole = db.Roles.SingleOrDefault(x => x.RoleID == role.RoleID);
                db.Entry(existingRole).CurrentValues.SetValues(role);
                db.SaveChanges();

                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpGet]
        public string AssignRole(long userId, long roleId)
        {
            try
            {
                var user = db.Users.Where(x => x.UserID == userId).ToList<User>()[0];
                user.RoleID = roleId;
                db.SaveChanges();
                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpGet]
        public String GetRoles()
        {
            var list = db.Database.SqlQuery<Role>("SELECT * FROM Roles").ToList<Role>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpPost]
        public void ProcessRequest()
        {
            string str_image = "";

            foreach (string s in Request.Files)
            {
                var file = Request.Files[s];
                //  int fileSizeInBytes = file.ContentLength;
                string fileName = file.FileName;
                string fileExtension = file.ContentType;

                string imgName = "" + DateTime.Now.Ticks;

                if (!string.IsNullOrEmpty(fileName))
                {
                    fileExtension = Path.GetExtension(fileName);
                    var parts = fileName.Split('.');
                    str_image = imgName + "_" + parts[0] + fileExtension;
                    string pathToSave_100 = Server.MapPath("~/Content/images/") + str_image;
                    file.SaveAs(pathToSave_100);

                }
            }
            Response.ContentType = "text/plain";
            Response.Write(str_image);
            //Response.Close();
        }

        [System.Web.Http.HttpGet]
        public string DeleteFile(string filename)
        {
            try
            {
                string partialName = filename;
                DirectoryInfo hdDirectoryInWhichToSearch = new DirectoryInfo(Server.MapPath("~/Content/images/"));
                FileInfo[] filesInDir = hdDirectoryInWhichToSearch.GetFiles("*" + partialName + "*.*");

                foreach (FileInfo foundFile in filesInDir)
                {
                    string fullName = foundFile.FullName;
                    Console.WriteLine(fullName);
                }    
                if (System.IO.File.Exists(Server.MapPath("~/Content/images/") + filesInDir[0].Name))
                {
                    System.IO.File.Delete(Server.MapPath("~/Content/images/") + filesInDir[0].Name);
                    return "1";
                }

                return "File does not exist";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpGet]
        public string GetReportImages(long id)
        {
            var list = db.DailyReportSales.Where(x => x.DailyReportID == id).Select(x => new { x.SaleReceiptImage }).ToList();
            return JsonConvert.SerializeObject(list);
        } 

        [System.Web.Http.HttpGet]
        public string GetTasksByUserId(long id)
        {
            var list = db.GET_ALL_TASKS().ToList<GET_ALL_TASKS_Result>();
            return JsonConvert.SerializeObject(list);
            
        }

        [System.Web.Http.HttpPost]
        public string AddTask()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                Task newTask = JsonConvert.DeserializeObject<Task>(requestFromPost);
                newTask.LastUpdate = DateTime.Now;
                db.Tasks.Add(newTask);
                db.SaveChanges();

                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpPost]
        public string UpdateTask()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                Task t = JsonConvert.DeserializeObject<Task>(requestFromPost);
                t.LastUpdate = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("Pakistan Standard Time"));
                var existingRole = db.Tasks.SingleOrDefault(x => x.TaskId == t.TaskId);
                if (t.TaskOwner == -1)
                    t.TaskOwner = existingRole.TaskOwner;
                db.Entry(existingRole).CurrentValues.SetValues(t);
                db.SaveChanges();

                return "1";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [System.Web.Http.HttpGet]
        public String GetVehicleChecklists(DateTime from, DateTime to, string vehicleNumber)
        {
            var fr = "" + from.Year + "-" + from.Month + "-" + from.Day;
            var t = "" + to.Year + "-" + to.Month + "-" + to.Day; 

            var list = db.GET_VEHICLE_CHECKLISTS(fr, t, vehicleNumber).ToList<GET_VEHICLE_CHECKLISTS_Result>();
            List<CheckListModel> checklistQuestions = new List<CheckListModel>();
            int startingIndex = 0;
            foreach (var obj in list)
            {
                if (!isDateFound(obj.Date, checklistQuestions))
                {
                    CheckListModel checklist = new CheckListModel();
                    checklist.list = new List<CheckListArray>();
                    checklist.ListOfImages = new List<string>();
                    checklist.Date = obj.Date;
                    checklist.VehicleNumber = vehicleNumber;
                    if(obj.Reading != null && obj.Reading != "")
                        checklist.OpeningReading = long.Parse(obj.Reading);
                    for (int i = startingIndex; i < list.Count; i++)
                    {
                        if (obj.Date == list[i].Date)
                        {
                            CheckListArray cla = new CheckListArray();
                            cla.question = list[i].QuestionStatement;
                            cla.status = list[i].Status;
                            checklist.list.Add(cla);

                            if (!checklist.ListOfImages.Contains(list[i].ImageName))
                            {
                                checklist.ListOfImages.Add(list[i].ImageName);
                            }
                        }
                        else
                        {
                            startingIndex = i;
                            break;
                        }
                    }
                    checklistQuestions.Add(checklist);
                }
            }
            return JsonConvert.SerializeObject(checklistQuestions);
        }

        private bool isDateFound(DateTime ft, List<CheckListModel> list){
            foreach (var obj in list)
            {
                if (obj.Date == ft)
                {
                    return true;
                }
            }
            return false;
        }
        [System.Web.Http.HttpPost]
        public string UpdateVehicle() {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                var vehicle = JsonConvert.DeserializeObject<Vehicle>(requestFromPost);
                var obj = db.Vehicles.Where(x => x.VehicleNumber == vehicle.VehicleNumber).ToList()[0];
                db.Entry(obj).CurrentValues.SetValues(vehicle);
                db.SaveChanges();
                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [System.Web.Http.HttpPost]
        public string UpdateStaff()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                var user = JsonConvert.DeserializeObject<User>(requestFromPost);
                var obj = db.Users.Where(x => x.Userusername == user.Userusername).ToList()[0];
                obj.UserName = user.UserName;
                obj.UserCNIC = user.UserCNIC;
                obj.UserDOB = user.UserDOB;
                obj.UserEmail = user.UserEmail;
                obj.UserGender = user.UserGender;
                obj.UserPhoneNumber = user.UserPhoneNumber;
                obj.UserType = user.UserType;
                obj.Userusername = user.Userusername;
                obj.UserPassword = user.UserPassword;
                db.SaveChanges();
                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [System.Web.Http.HttpGet]
        public String GetChecklists()
        {
            var list = db.GET_CHECKLISTS().ToList<GET_CHECKLISTS_Result>();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpGet]
        public string GetTasksByChecklistId(long Id)
        {
            var list = db.Tasks.Where(x => x.DailyChecklistId == Id).ToList();
            return JsonConvert.SerializeObject(list);
        }

        [System.Web.Http.HttpPost]
        public string SubmitApproval()
        {
            try
            {
                StreamReader reader = new StreamReader(Request.InputStream);
                string requestFromPost = reader.ReadToEnd();

                var list = JsonConvert.DeserializeObject<List<Task>>(requestFromPost);

                foreach (var item in list)
                {
                    var task = db.Tasks.Where(x => x.TaskId == item.TaskId).ToList()[0];
                    db.Entry(task).CurrentValues.SetValues(item);
                }

                db.SaveChanges();
                
                return "1";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}
