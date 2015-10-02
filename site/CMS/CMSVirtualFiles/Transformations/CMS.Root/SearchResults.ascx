<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="SearchResult">
  <div class="ResultTitle">
    <a href="<%# GetDocumentUrl()%>"><%# IfEmpty(Eval("SearchResultName",true), "/", Eval("SearchResultName",true)) %></a>
  </div>
  <div class="ResultPath">
    Path: <%# Eval("DocumentNamePath",true) %><br />
  </div>
</div>
