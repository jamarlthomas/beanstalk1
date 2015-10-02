<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><a href="?imagepath=<%# System.Web.HttpUtility.UrlEncode(DataBinder.Eval(Container, "DataItem.NodeAliasPath").ToString()) %>">

<%#IfEmpty(Eval("FileAttachment"), "no image", "<img alt='" + Eval("FileName") + "' src='" + GetFileUrl("FileAttachment") + "?maxsidesize=300' border='0' />")%>

</a>