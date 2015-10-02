<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<div>
  <cms:CMSWebPartZone ZoneID="zoneA" runat="server" />      
</div>
<div style="width: 100%;">
    <cms:CMSWebPartZone ZoneID="zoneB" runat="server" />      
</div>
<div>
  <cms:CMSWebPartZone ZoneID="zoneC" runat="server" />
</div>