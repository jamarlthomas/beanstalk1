<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<!-- Container -->
<div class="userContributions">
	<!-- List zone -->
	<div class="zoneList">
		<cms:CMSWebPartZone ZoneID="zoneList" runat="server" />
	</div>
</div>