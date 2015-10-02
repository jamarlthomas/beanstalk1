<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="NewsPTitle"><a href="<%# GetDocumentUrl() %>">
  <%# Eval("NewsTitle",true) %></a>&nbsp;|&nbsp;<%# GetDateTime("NewsReleaseDate", "d") %>
</div>
<div class="NewsPBody">
  <div class="TextContent"><%# Eval("NewsSummary") %></div>
</div>