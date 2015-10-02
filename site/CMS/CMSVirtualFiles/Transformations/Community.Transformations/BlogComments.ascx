<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><strong><a href="<%# GetDocumentUrl(Eval("CommentPostDocumentID")) %>#comments" ><%# GetDateTime(Eval("CommentDate")).ToString("d") %></a></strong><br />
<strong><%# TrimSitePrefix(Eval("CommentUserName", true)) %></strong><br />
<%# HTMLEncode(LimitLength(Eval("CommentText"), 62, "...")) %><br /><br />