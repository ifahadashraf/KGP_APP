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
            return View();
        }

        public ActionResult Rents()
        {
            return View();
        }

        public ActionResult DailyReport()
        {
            return View();
        }

        public ActionResult ChecklistReport()
        {
            return View();
        }

    }
}
