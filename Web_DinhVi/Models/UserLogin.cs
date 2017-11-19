using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web_DinhVi.Models
{
    [Serializable]
    public class UserLogin
    {

        public string Email { get; set; }
        public string Password { get; set; }
    }
}