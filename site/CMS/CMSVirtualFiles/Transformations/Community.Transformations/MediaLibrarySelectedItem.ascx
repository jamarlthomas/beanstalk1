<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSModules/MediaLibrary/Controls/LiveControls/MediaFilePreview.ascx" TagName="MediaFilePreview" TagPrefix="cc1" %>

<div class="MediaGalleryPagger">
<a href="<%# HTMLHelper.EncodeForHtmlAttribute(URLHelper.RemoveParameterFromUrl(CMS.Helpers.RequestContext.CurrentURL, "fileid")) %>">Back</a>
</div>


<div class="MediaGalleryDetail">
	<cc1:MediaFilePreview ID="filePreview" runat="server" Width="530" Height="360" maxsidesize="530" />
</div>

<div class="MediaGalleryDetailBottom">
<h2 style="float: left"><%# HTMLEncode(GetNotEmpty("FileTitle;FileName")) %></h2>
<a href="<%# HTMLHelper.HTMLEncode(MediaLibraryFunctions.GetMediaFileUrl(Eval("FileLibraryID") ,Eval("FilePath"), Eval("FileGUID"), Eval("FileName"), GetDataControlValue<bool>("UseSecureLinks"), true)) %>" target="_blank">
<img src="~/App_Themes/CommunitySite/Images/button_media_download.gif" alt="Download" />
</a>
</div>
<div class="clear"></div>
<p>
<strong>Size:</strong>&nbsp;<%# DataHelper.GetSizeString(ValidationHelper.GetLong(Eval("FileSize"), 0)) %><br/>
<strong>Description:</strong>&nbsp;<%# ResHelper.GetString(Convert.ToString(Eval("FileDescription", true))) %><br/>
<strong>Uploaded:</strong>&nbsp;<%# ((DateTime)Eval("FileCreatedWhen")).ToString("M/d/yyyy") %><br />
<strong>Type:</strong>&nbsp;<%# Eval("FileExtension", true) %>
</p>
