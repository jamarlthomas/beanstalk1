<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="blogRightList">
<%# IfEmpty(Eval("BlogTeaser",true),"","<div class=\"blogTeaser\"><img src=\""+GetFileUrl("BlogTeaser")+"?width=60\" /></div>") %>
<p><a href="<%# GetDocumentUrl() %>" title="<%# Eval("BlogName",true) %>"><%# Eval("BlogName",true) %></a></p>
<div class="clear">&nbsp;</div>
</div>