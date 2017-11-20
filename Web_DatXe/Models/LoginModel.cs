using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Web_DatXe.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Bạn phải nhập email")]
        public string Emai { get; set; }

        [Required(ErrorMessage = "Bạn phải nhập mật khẩu")]
        public string Password { get; set; }
    }
}