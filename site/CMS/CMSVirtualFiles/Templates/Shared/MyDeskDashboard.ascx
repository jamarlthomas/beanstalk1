<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<table border="0" width="100%" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="2">
    	<cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />      
    </td>
  </tr>
  <tr>
    <td colspan="3">
      <cms:CMSWebPartZone ZoneID="DashboardTop" runat="server" />      
    </td>
  </tr>
  <tr valign="top">
    <td style="width:50%">
      <cms:CMSWebPartZone ZoneID="zoneLeft" runat="server" />      
    </td>
    <td style="width:50%">
      <cms:CMSWebPartZone ZoneID="zoneRight" runat="server" />      
    </td>
  </tr>
   <tr>
    <td colspan="3">
      <cms:CMSWebPartZone ZoneID="DashBoardBottom" runat="server" />      
    </td>
  </tr>
</table>
