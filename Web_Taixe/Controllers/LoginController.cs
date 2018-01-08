using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

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