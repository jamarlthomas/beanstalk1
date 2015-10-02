<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h1><%# Eval("ArticleName",true) %></h1>
<p>
<%# IfEmpty(Eval("ArticleTeaserImage"), "", "<img alt=\"" + Eval("ArticleName",true) + "\" src=\"" + GetFileUrl("ArticleTeaserImage") + "?maxsidesize=100\" align=\"left\" hspace=\"5\" vspace=\"5\" />") %>
<%# Eval("ArticleText") %>
</p>
