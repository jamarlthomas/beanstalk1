<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="sql-search">
  <div class="title">
    <strong>
      <a href="<%# "javascript:SelectItem(" + Eval("NodeID") + ", \'" + Eval("DocumentCulture") + "\')" %>"><%# IfEmpty(Eval("NodeName"), "/", HTMLHelper.HTMLEncode(ValidationHelper.GetString(Eval("DocumentName"), null))) %> (<%# Eval("DocumentCulture") %>)</a>
    </strong>
  </div>
  <div class="footer">
    <span class="url"><%# GetAbsoluteUrl(GetDocumentUrl()) %></span>
    <span class="date">
      <%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("DocumentCreatedWhen"), DateTimeHelper.ZERO_TIME), true) %>
    </span>
  </div>
</div>