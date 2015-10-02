<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><cms:groupmenucontainer runat="server" ID="groupMenuElem" MenuID="groupContextMenu" Parameter='<%# Eval("GroupID").ToString() %>' ContextMenuCssClass="UserContextMenu" >
<div class="group">
<div class="avatar">
<a href="<%# GetGroupProfileUrl(Eval("GroupName",true)) %>" title="<%# Eval("GroupDisplayName",true) %>">
<%# GetGroupAvatarImage(52, Eval("GroupDisplayName",true)) %>
</a>
</div>
<div class="groupInfo">
<h3><a href="<%# GetGroupProfileUrl(Eval("GroupName",true)) %>" title="<%# Eval("GroupDisplayName",true) %>"><%# Eval("GroupDisplayName",true) %></a></h3>
<p><%# LimitLength(Eval("GroupDescription",true), 62, "...") %></p>
</div>
</div>
</cms:groupmenucontainer>
