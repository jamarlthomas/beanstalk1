<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div>
<%# GetAttachmentIcon("AttachmentGUID") %>
<a target="_blank" href="<%# GetAbsoluteUrl(GetAttachmentUrl(Eval("AttachmentName"), Eval("NodeAliasPath")), EvalInteger("AttachmentSiteID")) %>">
<%# Eval("AttachmentName",true) %>
</a>
</div>