﻿<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<!-- Container -->
<div class="blogDetail">
	<!-- Top zone -->
	<div class="zoneTop">
		<cms:CMSWebPartZone ZoneID="zoneTop" runat="server" />      
	</div>
	<!-- Left zone -->
	<div class="zoneLeft" style="float: left;">
		<cms:CMSWebPartZone ZoneID="zoneLeft" runat="server" />      
	</div>
	<!-- Right zone -->
	<div class="zoneRight" style="float: right;">
		<cms:CMSWebPartZone ZoneID="zoneRight" runat="server" />      
	</div>
</div>
