using System;

using CMS.ExtendedControls;
using CMS.UIControls;

public partial class CMSAdminControls_Debug_CacheLog : CacheLog
{
    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);

        Visible = false;

        var dt = GetLogData();
        if (dt != null)
        {
            Visible = true;

            // Setup header texts
            gridCache.SetHeaders("", "CacheLog.Operation", "CacheLog.Data", "General.Context");

            HeaderText = GetString("CacheLog.Info");

            gridCache.DataSource = dt;
            gridCache.DataBind();
        }
    }
}