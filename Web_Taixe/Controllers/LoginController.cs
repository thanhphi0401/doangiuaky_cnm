using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Taixe.Models;

namespace Web_DinhVi.Controllers
{
    public class LoginController : Controller
    {


        [HttpPost]
        public JsonResult Login(string email, string password)
        {
            string statusLogin = "";
            var account = email.Split('@')[0];
            var arrayword = Enum.GetNames(typeof(AnotherAccount));
            int dem = 0;
            foreach (var item in arrayword)
            {
                if (account.Contains(item))
                {
                    statusLogin = "false";
                    dem++;
                }

            }
            if (dem == 0)
            {
                statusLogin = "true";
                User sessionUser = new User();
                sessionUser.Email = email;
                sessionUser.Password = password;

                Session.Add("USER_SESSION", sessionUser);
            }
            return Json(new
            {
                statusLogin = statusLogin
            });



        }

    }
    public enum AnotherAccount
    {
        tongdaivien,
        dinhvivien,
        giamsatvien
    }
}