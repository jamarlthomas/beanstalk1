<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h1><%# Eval("EventName", true) %></h1>
<table width="100%">
<tr valign="top">
<td width="150">
Event location:
</td>
<td>
<%# Eval("EventLocation") %>
</td>
</tr>
<tr valign="top">
<td>
Event date and time:
</td>
<td>
<%# Eval("EventDate") %>
</td>
</tr>
<tr valign="top">
<td colspan="2">
<%# Eval("EventSummary") %>
</td>
</tr>
<tr valign="top">
<td colspan="2">
<%# Eval("EventDetails") %>
</td>
</tr>
</table>