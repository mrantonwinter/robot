using robot.Models;
using robot.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace robot.Controllers
{
    public class StoredProcsController : ApiController
    {
        protected IEnumerable<StoredProcDetail> StoredProcs { get; set; }

        protected DBInfoService InfoService { get; set; }

        ///////////////////////////////////////////////////////////////////////////////////////////

        public StoredProcsController()
        {
            InfoService = new DBInfoService().Init();
            StoredProcs = InfoService.StoredProcs;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////

        [Route("api/StoredProcs")]
        public IEnumerable<string> Get()
        {
            return StoredProcs.Select(sp => sp.Name);
        }

        [Route ("api/StoredProcs/{name}/")]
        public StoredProcDetail Get(string name) 
        {
            return InfoService.GetDetail(StoredProcs.Where(sp => sp.Name == name).FirstOrDefault());
        }
    }
}
