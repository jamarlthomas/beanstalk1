<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><a style="display: block; color: black" href='<%# SearchResultUrl() %>'>
  <%# HTMLHelper.HTMLEncode(DataHelper.GetNotEmpty(Eval("Title"), "/")) %>
</a>