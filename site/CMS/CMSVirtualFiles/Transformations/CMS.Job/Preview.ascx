<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="Carrier">
<div class="Header">
  <a href="<%# GetDocumentUrl() %>"><%# Eval("JobName",true) %></a>
</div>
<div class="Body TextContent">
  <p><%# Eval("JobSummary") %></p>
  <strong>Location:</strong> <%# Eval("JobLocation") %>
</div>
</div>
<br />