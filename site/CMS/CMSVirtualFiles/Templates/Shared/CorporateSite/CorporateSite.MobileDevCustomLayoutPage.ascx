<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<div class="topHome">
  <div class="padding">
    <cms:CMSWebPartZone runat="server" ZoneID="zT" />
  </div>
</div>
<!-- Container -->
<div class="home">
  <div class="inner">
    <cms:CMSWebPartZone runat="server" ZoneID="zA" />
 <div class="center">
      <div class="padding">
        <cms:CMSWebPartZone runat="server" ZoneID="zM" />
      </div>
    </div>
    <div class="left">
      <div class="padding">
        <cms:CMSWebPartZone runat="server" ZoneID="zL" />
      </div>
    </div>
    <div class="right">
      <div class="padding">
        <cms:CMSWebPartZone runat="server" ZoneID="zR" />
      </div>
    </div>
    <div class="responsiveClear"></div>
  </div>
</div>
