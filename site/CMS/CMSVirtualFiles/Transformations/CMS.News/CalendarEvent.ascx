<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><strong><a href="<%# ResolveUrl(GetUrl( Eval("NodeAliasPath"), Eval("DocumentUrlPath"))) %>">
<%# Eval("NewsTitle",true) %></a></strong>&nbsp;
(<%# System.Convert.ToString(Convert.ToDateTime(Eval("NewsReleaseDate"))) %>)<br />
<br />
<em>
<%# Eval("NewsSummary") %>
</em>