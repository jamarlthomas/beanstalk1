<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="Office">
<div class="Header">
  <a href="<%# GetDocumentUrl() %>"><%# Eval("OfficeName",true) %></a>
</div>
<div class="Body">
  <table>
  <tr><td rowspan="2" style="vertical-align: top;"><%#IfEmpty(Eval("OfficePhoto"), "", "<img src='" + GetFileUrl("OfficePhoto") + "?height=50' alt='" + Eval("OfficeName") + "' />")%></td></tr>
  <tr><td class="Address" style="vertical-align: top;">
    <%# IfEmpty(Eval("OfficeAddress1"),"", Eval("OfficeAddress1",true)+"<br />") %>
    <%# IfEmpty(Eval("OfficeAddress2"),"", Eval("OfficeAddress2",true)+"<br />") %>
    <%# Eval("OfficeCity",true) %>, <%# Eval("OfficeState",true) %> <%# Eval("OfficeZIP",true) %>
  </td></tr>
  </table>
<%# Eval("OfficeDescription") %>
</div>
</div>
<br />