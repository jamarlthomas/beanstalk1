<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h1><%# Eval("EventName", true) %></h1>
<table width="100%" class="TextContent">
<tr valign="top">
<td>
<%# Eval("EventDetails") %>
</td>
</tr>
<tr>
<td>
<table>
<tr valign="top">
<td width="150">
<strong>Event capacity:</strong>
</td>
<td>
<%# IfEmpty(Eval("EventCapacity"),"N/A",Eval("EventCapacity")) %>
</td>
</tr>
<tr valign="top">
<td width="150">
<strong>Event location:</strong>
</td>
<td>
<%# Eval("EventLocation") %>
</td>
</tr>
<tr valign="top">
<td>
<strong>Event date:</strong>
</td>
<td>
<%# GetEventDateString(Eval("EventDate"),Eval("EventEndDate"),Eval<bool>("EventAllDay")) %>
</td>
</tr>
</table>
</td>
</tr>
</table>