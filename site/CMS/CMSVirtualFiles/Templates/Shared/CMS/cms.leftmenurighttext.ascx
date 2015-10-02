<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />      
<div style="width: 100%">
<table border="0" width="100%">
  <tr valign="top">
    <td width="20%">
      <cms:CMSWebPartZone ZoneID="zoneLeft" runat="server" />      
    </td>
    <td width="80%">
      <cms:CMSWebPartZone ZoneID="zoneRight" runat="server" />      
    </td>
  </tr>
</table>
</div>
<cms:CMSWebPartZone ZoneID="zoneBottom" runat="server" />      
