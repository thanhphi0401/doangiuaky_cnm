using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_DinhVi.Models;

namespace Web_DinhVi.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {

            var session = Session["USER_SESSION"];


            return View(session);
        }


    }
}