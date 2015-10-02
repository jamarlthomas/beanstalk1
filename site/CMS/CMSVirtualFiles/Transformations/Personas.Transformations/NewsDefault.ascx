<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h1><%# Eval("NewsTitle",true) %></h1>
<%# GetDateTime("NewsReleaseDate", "d") %><br/>
<%# IfEmpty(Eval("NewsTeaser"), "", GetImage("NewsTeaser")) %>
<%# IfEmpty(Eval("NewsSummary"), "", Eval("NewsSummary") + "<br />") %>
<%# Eval("NewsText") %>