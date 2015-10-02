<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<!-- Container -->
<div class="logonReg">
	<!-- Top zone -->
	<div class="topZone">
		<cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />
	</div>
	<!-- Left zone -->
	<div class="zoneLeft" style="width: 50%; float: left;">
		<div style="width: 300px; margin: 10px auto;">
			<cms:CMSWebPartZone ZoneID="zoneLeft" runat="server" />  
		</div>
	</div>
	<!-- Right zone -->
	<div class="zoneRight" style="width: 50%; float: right;">
		<div style="width: 300px; margin: 10px auto;">
			<cms:CMSWebPartZone ZoneID="zoneRight" runat="server" />
		</div>
	</div>
</div>
