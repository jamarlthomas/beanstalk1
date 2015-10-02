<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><table class="OfficeDetail TextContent">
<tr>
<td rowspan="2" style="vertical-align: top;"><%#IfEmpty(Eval("OfficePhoto"), "", "<img src='" + GetFileUrl("OfficePhoto") + "?height=90' alt='Photo' />")%>
</td>
<td style="vertical-align: top; padding-left: 20px;">
<h1><%# Eval("OfficeName",true) %></h1>
<%# IfEmpty(Eval("OfficeAddress1"),"",Eval("OfficeAddress1",true) + "<br />") %>
<%# IfEmpty(Eval("OfficeAddress2"),"",Eval("OfficeAddress2",true) + "<br />") %>
<%# Eval("OfficeCity",true) %>, <%# Eval("OfficeState",true) %> <%# Eval("OfficeZIP",true) %><br />
<%# Eval("OfficeCountry",true) %><br />
</td>
</tr>
</table>
<table class="TextContent">
<tr>
<td style="width: 50%">
<table>
<tr>
<td>
<strong>Phone:</strong>
</td>
<td>
<%# IfEmpty(Eval("OfficePhone"), "N/A", Eval("OfficePhone",true)) %>
</td>
</tr>
<tr>
<td>
<strong>E-mail:</strong>
</td>
<td>
<a href="mailto:<%# Eval("OfficeEmail") %>"><%# Eval("OfficeEmail",true) %></a>
</td>
</tr>
<tr><td colspan="2"><%# IfEmpty(Eval("OfficeDirections"),"","<strong>Office directions:</strong>" + Eval("OfficeDirections") + "") %>
</td>
</tr>
</table>
</td>
<td style="width: 50%"><%#IfEmpty(Eval("OfficeDescription"), "", "<strong>Additional information:</strong><br /><div class='Description'>" + Eval("OfficeDescription") + "</div>")%></td>
</tr>
</table>
