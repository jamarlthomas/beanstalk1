<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="BlogPTitle"><strong><a href="<%# GetDocumentUrl() %>">
  <%# Eval("BlogName", true) %></a></strong>
</div>
<div class="BlogPBody TextContent">
  <%# Eval("BlogDescription") %>
</div>
<br />
