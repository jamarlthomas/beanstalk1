<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="NewsPreviewTitle"><a href="~/mobile/news/<%# Eval("NewsID") %>.aspx"><%# Eval("NewsTitle",true) %></a></div>
<div class="NewsPreviewDate"><%# GetDateTime("NewsReleaseDate", "d") %></div>
<div class="NewsPreviewSummary"><%# Eval("NewsSummary") %></div>