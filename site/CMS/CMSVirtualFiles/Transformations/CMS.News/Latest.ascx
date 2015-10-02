<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="NewsLatest">
  <div class="NewsTitle">
    <%# Eval("NewsTitle",true) %>
  </div>
  <hr size="1" />
  <div class="NewsSummary">
    <%# Eval("NewsSummary") %>
  </div>
  <a href="<%# GetDocumentUrl() %>" class="LinkMore">more</a>
</div>