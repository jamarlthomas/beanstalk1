<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSModules/MediaLibrary/Controls/LiveControls/MediaFilePreview.ascx" TagName="MediaFilePreview" TagPrefix="cc1" %>
<div class="mediaItem">
<table>
	<tr>
		<td class="mediaLibraryPhoto"><a href="<%# HTMLHelper.HTMLEncode(MediaLibraryFunctions.GetMediaFileDetailUrl(Eval("FileID"))) %>" title="<%# ResHelper.GetString(Convert.ToString(Eval("FileDescription"))) %>">
		<cc1:MediaFilePreview ID="filePreview" runat="server" maxsidesize="117" width="117" height="117" /></a>
		</td>
	</tr>
	<tr>
		<td class="mediaLibraryDescription">
<a href="<%# HTMLHelper.HTMLEncode(MediaLibraryFunctions.GetMediaFileDetailUrl(Eval("FileID"))) %>" title="<%# ResHelper.GetString(Convert.ToString(Eval("FileDescription"))) %>">
			<%# HTMLEncode(LimitLength(GetNotEmpty("FileTitle;FileName"), 18, "...")) %>
			</a><br/>
			Size:&nbsp;<%# DataHelper.GetSizeString(ValidationHelper.GetLong(Eval("FileSize"), 0)) %><br/>
			Uploaded:&nbsp;<%# ((DateTime)Eval("FileCreatedWhen")).ToString("M/d/yyyy") %>

		</td>
	</tr>
</table>
<div class="mediaItemBottom"></div>
</div>