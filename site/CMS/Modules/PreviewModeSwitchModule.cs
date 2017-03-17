 ﻿using System;
 ﻿using System.Web;
 ﻿using CMS.Mvc.Helpers;
 ﻿using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.PortalEngine;

namespace CMS.Mvc.Modules
{
    public class PreviewModeSwitchModule : IHttpModule
    {
        public void Dispose()
        {

        }

        

        public void Init( HttpApplication context )
        {
            context.AcquireRequestState += SwitchPreview;
            context.BeginRequest += SwitchPreview;
        }

        private void SwitchPreview( object sender, EventArgs e )
        {
            if ( HttpContext.Current != null )
            {
                var preview = HttpContext.Current.Request.QueryString[ "preview" ];
                if ( !string.IsNullOrWhiteSpace( preview ) )
                {
                    PortalContext.SetViewMode( ViewModeEnum.Preview );
                    
                    //check if culture is supported by site and switch if does
                }
            }

        }

    }
}