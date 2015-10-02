<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><a href="<%# CMS.Helpers.RequestContext.RawURL + "?id="+Eval("ows_ID") %>"><%# Eval("ows_LinkFileName") %></a> <a href="<%# SharePointFunctions.GetSharePointFileUrl("server_name", SharePointFunctions.SplitSharePointField(EvalHTML("ows_FileRef"),1)) %>">download</a><br />

