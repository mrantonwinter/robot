using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace robot.Models
{
    public class StoredProcDetail
    {
        public string DB { get; set; }
        public string Name { get; set; }
        public List<Column> Input { get; set; }
        public List<Column> Output { get; set; }
    }
}