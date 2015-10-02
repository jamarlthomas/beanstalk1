<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><p><strong><%# GetDate("NewsReleaseDate") %></strong></p>
<div class="NewsReleaseTitle">
<a href="<%# GetDocumentUrl() %>"><%# StripTags(Eval("NewsSummary")) %></a>
</div>
