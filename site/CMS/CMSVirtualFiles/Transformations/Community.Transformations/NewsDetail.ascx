<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="newsItemDetail">
<h1><%# GetDateTime("NewsReleaseDate", "d") %></h1>
<div class="NewsSummary">
  <div class="newsSummary">
<%#IfEmpty(Eval("NewsTeaser"), "", "<div class='teaser'><img src='" + GetFileUrl("NewsTeaser") + "?maxsidesize=66' alt='" + Eval("NewsTitle", true) + " ' /></div>")%>
    <%# Eval("NewsSummary") %>
  </div>
</div>
<div class="NewsBody">
  <%# Eval("NewsText") %>
</div>
</div>