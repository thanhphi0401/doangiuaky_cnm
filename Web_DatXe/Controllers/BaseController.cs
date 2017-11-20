using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_DatXe.Models;

namespace Web_DatXe.Controllers
{
    public class BaseController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var session = (UserLogin)Session["USER_SESSION"];
            if (session == null)
            {
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary(new
                {
                    controller = "Login",
                    action = "Login",
                }));
            }
        }
    }
}