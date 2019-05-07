using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace KhalidPetroleum.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/

        public ActionResult Index()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }

        public ActionResult Rents()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }

        public ActionResult DailyReport()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }

        public ActionResult ChecklistReport()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }

        public ActionResult Verification()
        {
            if (Session["User"] != null)
                return View();
            else
                return View("SignIn");
        }

    }
}
