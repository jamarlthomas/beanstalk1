<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<!-- Container -->
<div class="textHeader">
	<!-- Header zone -->
	<div class="zoneHeader">
		<cms:CMSWebPartZone ZoneID="zoneHeader" runat="server" />
	</div>
	<!-- Content -->
	<div class="zoneContent">
		<cms:CMSWebPartZone ZoneID="zoneContent" runat="server" />
	</div>
</div>
