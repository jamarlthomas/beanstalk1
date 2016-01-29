using System.Collections;
using System.Collections.Generic;
using System.Web.Mvc;
using CMS.DocumentEngine;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using CMS.Mvc.Interfaces;
using Newtonsoft.Json;

namespace CMS.Mvc.Controllers.Afton
{
    public class SidebarPageController : BaseController
    {
        protected readonly ISidebarProvider sidebarProvider;
        public SidebarPageController()
        {
            sidebarProvider = new SidebarProvider();
        }

        public JsonResult SubmitEmail(string email)
        {
            //todo save emails
            return new JsonResult();
        }


        protected ArrayList MapSidebar(List<TreeNode> nodes)
        {
            var b = new ArrayList();
            nodes.ForEach(item => b.Add(ConvertSideBarComponent(item)));
            return b;
        }
        private SidebarItemViewModel ConvertSideBarComponent(TreeNode item)
        {
            switch (item.ClassName)
            {
                case "custom.ContactUs":
                    {
                        return new ContactUsViewModel(item, sidebarProvider.GetCountries());
                    }
                case "custom.StayInformed":
                    {
                        return new StayInformedViewModel(item);
                    }
                case "custom.InsightsAndResourcesWidget":
                    {

                        return new InsightsAndResourcesWidgetViewModel(item);
                    }
                case "custom.GenericSidebarBlock":
                    {
                        return new GenericSidebarBlockViewModel(item);
                    }
                case "custom.DocumentSidebarComponent":
                    {
                        return new DocumentsWidgetViewModel(item);
                    }
                default:
                    {
                        return null;
                    }
            }
        }


    }
}
