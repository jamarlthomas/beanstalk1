<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<div>
  <cms:CMSWebPartZone ZoneID="zoneA" runat="server" />      
</div>
<div style="width: 100%;">
  <div style="width: 50%; float: left;">
    <cms:CMSWebPartZone ZoneID="zoneB" runat="server" />      
  </div>
  <div style="width: 50%; float: right;">
    <cms:CMSWebPartZone ZoneID="zoneC" runat="server" />      
  </div>
</div>
<div style="clear: both">
  <div style="width: 50%; float: left;">
    <cms:CMSWebPartZone ZoneID="zoneD" runat="server" />      
  </div>
  <div style="width: 50%; float: right;">
    <cms:CMSWebPartZone ZoneID="zoneE" runat="server" />      
  </div>
</div>
<div style="clear: both;">
  <cms:CMSWebPartZone ZoneID="zoneF" runat="server" />    
</div>
