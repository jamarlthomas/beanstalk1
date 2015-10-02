<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<!-- Container -->
<div class="twoColumnsLeft innerContent">
  <div class="inner">
    <div class="center">
      <div class="padding">
        <cms:CMSWebPartZone runat="server" ZoneID="zM" />
      </div>
    </div>
  </div>
</div>
