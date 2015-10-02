<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="TextContent">
<h1><%# Eval("JobName",true) %></h1>
<p>
<%# Eval("JobDescription") %>
</p>
</div>
<table class="TextContent">
<tr valign="top">
<td>
Location:
</td>
<td>
<%# Eval("JobLocation") %>
</td>
</tr>
<tr valign="top">
<td>
Compensation:
</td>
<td>
<%# Eval("JobCompensation") %>
</td>
</tr>
<tr valign="top">
<td>
Contact:
</td>
<td>
<%# Eval("JobContact") %>
</td>
</tr>
<tr valign="top">
<td>
Attachment:
</td>
<td>
<%#IfEmpty(Eval("JobAttachment"), "N/A", "<a href='" + GetFileUrl("JobAttachment") + "' >Download document</a>")%>
</td>
</tr>
</table>