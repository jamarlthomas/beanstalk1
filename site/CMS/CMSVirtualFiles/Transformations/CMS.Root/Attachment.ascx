<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div>
<a target="_blank" href="<%# GetAbsoluteUrl(GetAttachmentUrl(Eval("AttachmentName"), Eval("NodeAliasPath")), Eval<int>("AttachmentSiteID")) %>">
<%# IfCompare(ImageHelper.IsImage((string)Eval("AttachmentExtension")), true, GetAttachmentIcon("AttachmentGUID"), "<img style=\"border: none;\" src=\"" + GetAbsoluteUrl(GetAttachmentUrl(Eval("AttachmentName"), Eval("NodeAliasPath")), Eval<int>("AttachmentSiteID")) + "?maxsidesize=150\" alt=\"" + Eval("AttachmentName", true) + "\" />") %>
</a>
<%# IfCompare(ImageHelper.IsImage((string)Eval("AttachmentExtension")), true, "<br />" + ResHelper.GetString("attach.openfile"), "") %>
<br />
<%# Eval("AttachmentName",true) %>
<br />
</div>