<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h2><a href="<%# GetDocumentUrl() %>"><%# Eval("EventName", true) %></a></h2>
<p><%# Eval("EventSummary") %></p>
<p>
Event location: <%# Eval("EventLocation") %><br />
Event start: <%# Eval("EventDate") %>
</p>