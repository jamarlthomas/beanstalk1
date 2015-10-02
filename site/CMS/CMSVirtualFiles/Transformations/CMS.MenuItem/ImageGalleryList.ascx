<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="gallery">
<h3><%# Eval("DocumentName",true) %></h3>
<a href="<%# GetDocumentUrl() %>"><img class="teaser" src="<%# GetFileUrl("MenuItemTeaserImage") %>?height=150&amp;width=200" alt="<%# Eval("DocumentName",true) %>" /></a>
</div>