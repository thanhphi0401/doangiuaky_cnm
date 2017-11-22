using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_DinhVi.Models;

namespace Web_DinhVi.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {

            return View();
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
        
        
        public ActionResult Logout()
        {
            Session.Clear();
            return View("Index");
        }
    }
    public enum AnotherAccount
    {
        tongdaivien1,
        tongdaivien2
    }
}