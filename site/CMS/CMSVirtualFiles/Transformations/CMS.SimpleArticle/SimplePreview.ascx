<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="Article">
<div class="Header">
	<a href="<%# GetDocumentUrl() %>" ><%# Eval("ArticleTitle",true) %></a>
</div>
<div class="Body">
	<div>
	<div class="TextContent"><%# Eval("ArticleText") %></div>
	</div>
</div>
</div>
<br />