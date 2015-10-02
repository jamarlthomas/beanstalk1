<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="newsItem">
<%#IfEmpty(Eval("NewsTeaser"), "", "<div class='teaser'><img src='" + GetFileUrl("NewsTeaser") + "?maxsidesize=66' alt='" + Eval("NewsTitle", true) + " ' /></div>")%>
<h3><a href="<%# GetDocumentUrl() %>"><%# Eval("NewsTitle",true) %></a> | <%# GetDateTime("NewsReleaseDate", "d") %></h3>
<p><%# Eval("NewsSummary") %></p>
<div class="clear">&nbsp;</div>
</div>