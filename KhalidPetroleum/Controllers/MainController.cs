using KhalidPetroleum.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KhalidPetroleum.Controllers
{
    public class MainController : Controller
    {
        KhalidOilDBEntities db = new KhalidOilDBEntities();
        //
        // GET: /Main/

        private Controller data = new DataController();

        public ActionResult Index()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult SignIn()
        {
            Session.Clear();
            return View();
        }
        public ActionResult SalePurchase()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult Checklist()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult Attendance()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult DailyExpenses()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult CashReceived()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult Payments()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult Maintenance()
        {
            if (Session["User"] != null)
            {
                //ViewBag.Tasks = GetMaintenanceTasks();
                return View();
            }
            else
                return View("SignIn");
        }
        public ActionResult Tasks()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult Staff()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult Vehicles()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }
        public ActionResult DSites()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }

        public ActionResult Roles()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }

        public Dictionary<string, List<Task>> GetMaintenanceTasks()
        {
            var map = new Dictionary<string, List<Task>>();
            var tasks = db.Tasks.Where(x => x.TaskType == 2 && x.VehicleNumber != null).ToList();
            tasks.Reverse();
            foreach (var item in tasks)
            {
                if (map.ContainsKey(item.VehicleNumber))
                {
                    map[item.VehicleNumber].Add(item);
                }
                else
                {
                    var list = new List<Task>();
                    list.Add(item);
                    map.Add(item.VehicleNumber, list);
                }
            }

            return map;
        }
    }
}
