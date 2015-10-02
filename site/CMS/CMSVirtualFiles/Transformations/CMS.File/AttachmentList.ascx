<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><a target="_blank" href="<%# GetFileUrl("FileAttachment") %>">
<%# IfImage("FileAttachment", GetImage("FileAttachment", 400, 400, 400, Eval("FileDescription")), "") %>
<br /><%# Eval("FileName",true) %></a><br />