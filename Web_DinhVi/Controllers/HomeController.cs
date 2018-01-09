using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_DinhVi.Models;

namespace Web_DinhVi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        public JsonResult getCurrenLocator()
        {
            var item = (UserLogin)Session["USER_SESSION"];

            return Json(new
            {
                Email = item.Email
            }, JsonRequestBehavior.AllowGet);

        }
    }
}