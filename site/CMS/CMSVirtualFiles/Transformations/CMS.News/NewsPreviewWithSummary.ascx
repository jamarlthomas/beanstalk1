<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="TextContent">
<div class="NewsPreviewTitle"><a href="<%# GetDocumentUrl() %>"><%# Eval("NewsTitle",true) %></a></div>
<div class="NewsPreviewDate"><%# GetDateTime("NewsReleaseDate", "d") %></div>
<div class="NewsPreviewSummary TextContent"><%# Eval("NewsSummary") %></div>
</div>