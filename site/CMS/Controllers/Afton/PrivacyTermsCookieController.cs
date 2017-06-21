using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Mvc.ViewModels.PrivacyTermsCookie;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Controllers.Afton;
using CMS.DocumentEngine;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.DocumentBase;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.Generic;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using CMS.Localization;
using CMS.Membership;
using CMS.DataEngine;
using System.Collections;

namespace CMS.Mvc.Controllers.Afton
{
    public class PrivacyTermsCookieController : SidebarPageController
    {
        private readonly IPrivacyTermsCookieProvider _privacyTermsProvider;
        private readonly IDocumentConstantProvider _documentConstantProvider;
        private readonly ISidebarProvider _sidebarProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        // GET: PrivacyTermsCookie
        public PrivacyTermsCookieController()
        {
            _documentConstantProvider = new DocumentConstantProvider();
            _privacyTermsProvider = new PrivacyTermsCookieProvider();
            _sidebarProvider = new SidebarProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public virtual ActionResult Index(string DocumentName)
        {
            var document = _privacyTermsProvider.GetTermsAndCookiesPage();

            var genericViewModel = MapData<Privacyconstants, PrivacyTermCookieViewModel>(document);

            List<TreeNode> sidebarItem = null;
            var newdoc = ContentHelper.GetDocByDocId<Privacyconstants>(document.DocumentID);
            sidebarItem = newdoc.Fields.PrivacySidebar.ToList();


            return View("~/Views/Afton/PrivacyTermsCookie/Index.cshtml", new PrivacyTermCookieViewModel()
            {
                PrivacyHeader = (string)document.GetValue("PrivacyHeader"),
                PrivacyContent = (string)document.GetValue("PrivacyContent"),
                PrivacySidebar = new SidebarViewModel
                {
                    Items = MapSidebar(sidebarItem, document)
                },
                CookieHeader = (string)document.GetValue("CookieHeader"),
                CookieContent = (string)document.GetValue("CookieContent"),
                PrefCookieHeader = (string)document.GetValue("PrefCookieHeader"),
                PrefCookieMessage = (string)document.GetValue("PrefCookieMessage"),
                PerfCookieHeader = (string)document.GetValue("PerfCookieHeader"),
                PerfCookieMessage = (string)document.GetValue("PerfCookieMessage"),
                PersonCookieHeader = (string)document.GetValue("PersonCookieHeader"),
                PersonCookieMessage = (string)document.GetValue("PersonCookieMessage"),
            });
           
        }

    }
}