<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="NewsTitle">
  <a href="<%# GetDocumentUrl() %>"><%# Eval("NewsTitle",true) %></a>
</div>
<div class="NewsSummary">
  <%# IfEmpty(Eval("NewsTeaser"), "", GetImage("NewsTeaser")) %>
  <div class="Date">
  <%# GetDateTime("NewsReleaseDate", "d") %>
  </div>
  <%# Eval("NewsSummary") %>
  <div class="Clearer"></div>
</div>