﻿<%@ Control Language="C#" Inherits="CMS.PortalControls.CMSAbstractLayout" %> 
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.PortalControls" Assembly="CMS.PortalControls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.DocumentEngine" Assembly="CMS.DocumentEngine" %>
<cms:CMSWebPartZone ZoneID="zoneHeader" runat="server" ZoneType="Header" />
<div class="textSimple">
	<cms:CMSWebPartZone ZoneID="zoneContent" runat="server" />
</div>
