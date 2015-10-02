<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="newsItemDetail">
<h1><%# Eval("NewsTitle",true) %></h1>
<div class="NewsSummary">
  <%# IfEmpty(Eval("NewsTeaser"), "", GetImage("NewsTeaser")) %>
  <div class="NewsContent">
    <div class="Date"><%# GetDateTime("NewsReleaseDate", "d") %></div>
    <div class="TextContent"><%# Eval("NewsSummary") %></div>
  </div>
  <div class="Clearer">&nbsp;</div>
</div>
<div class="NewsBody">
  <div class="TextContent"><%# Eval("NewsText") %></div>
</div>
</div>