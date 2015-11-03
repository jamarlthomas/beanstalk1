using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace CMS.Mvc.App_Start
{
    public static class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/js")
                .Include("~/Scripts/library/jquery.min.js")
                .Include("~/Scripts/library/jquery.animate-colors.min.js")
                .Include("~/Scripts/custom/bgSwitch.min.js")
                .Include("~/Scripts/library/head.min.js"));

            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/css/normalize.min.css")
                .Include("~/css/styles.min.css")
                .Include("~/fonts/fonts.css"));
        }
    }

}