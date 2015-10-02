<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><table>
<tr>
<td>Event name:</td>
<td><%# Eval("EventName", true) %></td>
</tr>
<tr>
<td>Event summary:</td>
<td><%# Eval("EventSummary") %></td>
</tr>
<tr>
<td>Event details:</td>
<td><%# Eval("EventDetails") %></td>
</tr>
<tr>
<td>Event location:</td>
<td><%# Eval("EventLocation") %></td>
</tr>
<tr>
<td>Event date and time:</td>
<td><%# GetEventDateString(Eval("EventDate"),Eval("EventEndDate"),Eval<bool>("EventAllDay")) %></td>
</tr>
<tr>
<td>Capacity:</td>
<td><%# Eval("EventCapacity") %></td>
</tr>
<tr>
<td>Open from:</td>
<td><%# Eval("EventOpenFrom") %></td>
</tr>
<tr>
<td>Open to:</td>
<td><%# Eval("EventOpenTo") %></td>
</tr>
</table>