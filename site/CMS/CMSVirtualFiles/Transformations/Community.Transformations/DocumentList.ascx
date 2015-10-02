<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div style="font-size: 15px; padding-bottom: 7px;"><a href="<%# GetDocumentUrl() %>"><%# Eval("DocumentName", true) %></a></div>
