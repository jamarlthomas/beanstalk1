<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="newsItem">
<p><strong><a href="<%# GetDocumentUrl() %>"><%# Eval("NewsTitle",true) %></a></strong></p>
<p><%# StripTags(Eval("NewsSummary")) %></p>
</div>