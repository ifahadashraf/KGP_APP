using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KhalidPetroleum.Controllers
{
    public class MainController : Controller
    {
        //
        // GET: /Main/

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
            return View();

            //if (Session["User"] != null)
            //    return View();
            //else
            //    return View("SignIn");
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
                return View();
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
    }
}
