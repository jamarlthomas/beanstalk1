<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><strong><a href="<%# ResolveUrl(GetUrl( Eval("NodeAliasPath"), null)) %>">
<%# Eval("DocumentName",true) %></a></strong>
<br />