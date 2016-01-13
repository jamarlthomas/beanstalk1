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
				.Include("~/Scripts/library/jquery.easing.min.js")
				.Include("~/Scripts/custom/mobileCheck.min.js")
				.Include("~/Scripts/library/jquery.animate-colors.min.js")
				.Include("~/Scripts/library/jquery.dotdotdot.min.js")
				.Include("~/Scripts/library/hammer.min.js")
				.Include("~/Scripts/library/jquery.columnizer.js")
				.Include("~/Scripts/library/jquery.actual.min.js")
				.Include("~/Scripts/custom/ellipsesText.min.js")
				.Include("~/Scripts/custom/columnizeText.min.js")
                //.Include("~/Scripts/custom/print.min.js")
                .Include("~/Scripts/library/head.min.js")
                );

            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/css/normalize.min.css")
                .Include("~/css/styles.min.css")
                .Include("~/fonts/fonts.css")
                .Include("~/css/print.min.css")
                );
        }
    }

}