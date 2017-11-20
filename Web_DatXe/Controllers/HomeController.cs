using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Web_DatXe.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Index1()
        {
            return View("LoginView");
        }

        public ActionResult GetCustomerList()
        {
            return View("CustomerListView");
        }

    }
}