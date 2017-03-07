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
            /*Javascript Libaries*/
            bundles.UseCdn = true;
            bundles.Add(new ScriptBundle("~/bundles/js")
                .Include("~/Scripts/library/jquery.min.js")
                .Include("~/Scripts/library/jquery.easing.min.js")
                .Include("~/Scripts/custom/mobileCheck.min.js")
                .Include("~/Scripts/library/jquery.animate-colors.min.js")
                .Include("~/Scripts/library/jquery.dotdotdot.min.js")
                .Include("~/Scripts/library/hammer.min.js")
                .Include("~/Scripts/library/jquery.columnizer.js")
                .Include("~/Scripts/library/jquery.actual.min.js")
                .Include("~/Scripts/library/jquery.placeholder.min.js")
                .Include("~/Scripts/library/jquery.balancetext.min.js")
                .Include("~/Scripts/library/angular.js")
                .Include("~/Scripts/library/dirPagination.min.js")
                .Include("~/Scripts/custom/prodFilter.min.js")
                .Include("~/Scripts/custom/terms-acronyms.min.js")
                .Include("~/Scripts/custom/ellipsesText.min.js")
                .Include("~/Scripts/custom/columnizeText.min.js")
                //.Include("~/Scripts/custom/balanceText.min.js")
                .Include("~/Scripts/library/head.min.js"));

            /*Custom Javascript*/
            bundles.Add( new ScriptBundle( "~/bundles/customjs" )
                .Include("~/Scripts/custom/homeSlideShow.min.js")
                .Include("~/Scripts/custom/search.min.js")
                .Include("~/Scripts/custom/langSel.min.js")
                .Include("~/Scripts/custom/megaMenu.min.js")
                .Include("~/Scripts/custom/mobileNav.min.js")
                .Include("~/Scripts/custom/copyrightDate.min.js")
                .Include("~/Scripts/custom/customSelectDropDown.min.js")
                .Include("~/Scripts/custom/cookies-display.min.js")
                .Include("~/Scripts/custom/sbuLandingDropDown.min.js")
                .Include("~/Scripts/custom/accordion.min.js")
                .Include("~/Scripts/custom/print.min.js")
                .Include("~/Scripts/custom/langDocSel.min.js")
                .Include("~/Scripts/custom/prodFilterNav.min.js")
                .Include("~/Scripts/custom/faqDropDown.min.js")
                .Include("~/Scripts/custom/documentPagination.min.js")
                .Include("~/Scripts/custom/polls-surveys.min.js")
                .Include("~/Scripts/custom/rate-this-content.min.js")
                .Include("~/Scripts/custom/formPollyfill.min.js")
                .Include("~/Scripts/custom/news-blogs-DropDown.min.js")
                .Include("~/Scripts/custom/stayinformed.js")
                );

            /*Load up Fonts and CSS*/
            bundles.Add( new StyleBundle( "~/bundles/fonts","//hello.myfonts.net/count/2f7def" ) );
            bundles.Add(new StyleBundle("~/bundles/css")
                .Include("~/css/normalize.min.css")

                .Include( "~/fonts/fonts.css", new CssRewriteUrlTransform() )
                .Include("~/css/styles.min.css"));

            bundles.Add(new StyleBundle("~/bundles/css/print")
                .Include("~/css/print.min.css"));
        }
    }

}