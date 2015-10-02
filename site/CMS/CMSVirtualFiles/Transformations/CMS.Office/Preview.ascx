<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><span class="Header">
<a href="<%# GetDocumentUrl() %>"><%# Eval("OfficeName",true) %></a>
</span>
  <table>
  <tr><td rowspan="2" style="vertical-align: top;"><%#IfEmpty(Eval("OfficePhoto"), "", "<img src='" + GetFileUrl("OfficePhoto") + "?height=50' alt='Photo' />")%></td></tr>
  <tr><td class="Address">
    <%# Eval("OfficeAddress1",true) %><br />
    <%# Eval("OfficeAddress2",true) %><br />
    <%# Eval("OfficeCity",true) %><br />
    <%# Eval("OfficeZIP",true) %><br />
    <%# Eval("OfficeState",true) %><br />
  </td></tr>
  </table>