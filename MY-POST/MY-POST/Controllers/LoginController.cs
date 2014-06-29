using MY_POST.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MY_POST.Controllers
{
    public class LoginController : Controller
    {
        //
        // GET: /Login/

        public ActionResult Index()
        {
            if (SessionManager.IdUsuario > 0)
            {
                return RedirectToAction("../Imagem");
            }

            return View();
        }
    }
}
