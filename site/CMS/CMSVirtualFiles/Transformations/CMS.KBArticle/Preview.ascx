<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h2><a href="<%# GetDocumentUrl() %>">Article <%# Eval("ArticleIdentifier",true) %>: <%# Eval("ArticleName",true) %></a></h2>
<p><%# Eval("ArticleSummary") %></p>
