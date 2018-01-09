using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Taixe.Models;

namespace Web_Taixe.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult getCurrentDriver()
        {
            var item = (User)Session["USER_SESSION"];

            return Json(new
            {
                Email = item.Email
            },JsonRequestBehavior.AllowGet);

        }

    }
}