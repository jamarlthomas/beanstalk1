<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="MediaListItem">
<table>
	<tr>
	<td class="MediaLibraryListPhoto">
<%# IfEmpty(Eval("LibraryTeaserPath"), "<img border='0' src=\"~/App_Themes/CommunitySite/Images/DefaultMediaTeaser.gif\" alt=\"\" />", "<img src=\"" + GetAbsoluteUrl(ValidationHelper.GetString(Eval("LibraryTeaserPath"), "")) + "?width=180\" alt=\""+ Eval("name") +"\" border='0' />") %>
		</td>
		<td class="MediaLibraryListDescription">
<strong>
<%# LimitLength(ResHelper.LocalizeString(Convert.ToString(Eval("LibraryDisplayName", true))), 20, "...") %>
</strong>


<div class="MediaLibraryListDescriptionText">
<%# LimitLength(ResHelper.LocalizeString(Convert.ToString(Eval("LibraryDescription", true))), 40, "...") %>
</div>

		</td>
	</tr>
</table>
<div class="MediaListItemBottom"></div>
</div>