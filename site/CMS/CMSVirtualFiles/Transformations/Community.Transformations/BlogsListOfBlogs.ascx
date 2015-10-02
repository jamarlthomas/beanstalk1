<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="blogMainList">
<%# IfEmpty(Eval("BlogTeaser"),"","<div class=\"blogListTeaser\"><img src=\""+GetFileUrl("BlogTeaser")+"?width=65\" /></div>") %>
<p><a href="<%# GetDocumentUrl() %>" title="<%# Eval("BlogName", true) %>"><%# Eval("BlogName", true) %></a></p>
<p><%# Eval("BlogDescription") %></p>
<div class="clear">&nbsp;</div>
</div>