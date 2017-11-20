using System;
using System.Web.Mvc;
using Web_DatXe.Models;

namespace Web_DatXe.Controllers
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