using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_DatXe.Models;

namespace Web_DatXe.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Login()
        {
            return View("../Home/LoginView");
        }


        [HttpPost]
        public JsonResult Login(string email, string password)
        {
            string statusLogin = "";
            var account = email.Split('@')[0];
            var arrayword = Enum.GetNames(typeof(AnotherAccount));
            foreach (var item in arrayword)
            {
                if (account.Contains(item))
                {
                    statusLogin = "false";
                    break;
                }
                else
                {

                    statusLogin = "true";
                }
            }
            if (statusLogin == "true")
            {
                //đưa vào Session
                UserLogin sessionUser = new UserLogin();
                sessionUser.Email = email;
                sessionUser.Password = password;

                Session.Add("USER_SESSION", sessionUser);
            }

            return Json(new
            {
                statusLogin = statusLogin
            });
        }

        [HttpPost]
        public ActionResult Logout()
        {
            Session.Clear();
            return View("Index");
        }
    }
    public enum AnotherAccount
    {
        dinhvivien,
        dinhvivien1,
        dinhvivien2
    }

}
