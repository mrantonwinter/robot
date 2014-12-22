using Microsoft.Practices.Unity;
using robot.Services;
using System.Collections.Generic;
using System.Web.Mvc;

namespace robot.Controllers
{
    public class HomeController : Controller
    {

        ///////////////////////////////////////////////////////////////////////////////////////////


        public HomeController()
        {
        }


        ///////////////////////////////////////////////////////////////////////////////////////////

        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }






        
    }
}
