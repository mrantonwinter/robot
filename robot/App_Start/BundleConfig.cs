using System.Web;
using System.Web.Optimization;

namespace robot
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //styles
            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/angular-material.css"));

            //javascript libraries
            bundles.Add(new ScriptBundle("~/bundles/libs").Include("~/Scripts/angular-material.js"));

            //our javascript
            bundles.Add(new ScriptBundle("~/bundles/robot").IncludeDirectory("~/Angular/JS", "*.js", true));
        }
    }
}