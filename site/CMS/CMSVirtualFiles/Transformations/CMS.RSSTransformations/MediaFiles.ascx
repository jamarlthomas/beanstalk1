<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSModules/MediaLibrary/Controls/LiveControls/MediaFilePreview.ascx" TagName="MediaFilePreview" TagPrefix="cc1" %>
<item>
  <guid isPermaLink="false"><%# Eval("FileGUID") %></guid>
  <title><%# EvalCDATA("FileTitle") %></title>
  <description><![CDATA[<cc1:MediaFilePreview ID="filePreview" runat="server" maxsidesize="200" width="200" height="200" DisplayActiveContent="false" /><br /><%# EvalCDATA("FileDescription",false) %>]]></description>
  <pubDate><%# GetRSSDateTime(Eval("FileCreatedWhen")) %></pubDate>
  <link><![CDATA[<%# GetAbsoluteUrl(GetMediaFileUrlForFeed(Eval("FileGUID"), Eval("FileName")), EvalInteger("FileSiteID")) %>]]></link>
</item>