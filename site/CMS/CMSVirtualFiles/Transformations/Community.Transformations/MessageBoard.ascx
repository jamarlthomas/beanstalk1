<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSModules/MessageBoards/Controls/MessageActions.ascx" TagName="MessageActions" TagPrefix="cms" %>
<%@ Register Src="~/CMSModules/AbuseReport/Controls/InlineAbuseReport.ascx" TagName="AbuseReport" TagPrefix="cms" %>
<div class="CommentDetail">
    <asp:Panel ID="pnlRating" runat="server" CssClass="CommentRating" />
    <table width="100%">
        <tr>
            <td class="CommentUserName" style="width: 100%">
		<%# IfEmpty(Eval("MessageURL"), TrimSitePrefix(Eval("MessageUserName", true)), "<a href=\"" + Eval("MessageURL", true) + "\" target=\"_blank\"" + IfCompare(HTMLHelper.UseNoFollowForUsersLinks(CMS.SiteProvider.SiteContext.CurrentSiteName), true, "", " rel=\"nofollow\" ") + ">" + TrimSitePrefix(Eval("MessageUserName", true)) + "</a>")%>                
	    </td>
        </tr>
        <tr>
            <td class="CommentText">
		<%# TextHelper.EnsureLineEndings(Convert.ToString(Eval("MessageText", true)), "<br />")%>
	    </td>
        </tr>
        <tr>
            <td class="CommentDate">
		<%# GetDateTime(Eval("MessageInserted")) %>
            </td>
        </tr>
        <tr>
            <td class="CommentAction TextRight">
			<cms:MessageActions ID="messageActions" runat="server" />
            </td>
        </tr>
        <tr>
            <td class="CommentAction TextRight">
			<cms:AbuseReport ID="ucInlineAbuseReport" runat="server" ReportObjectType="board.message" ReportObjectID='<%# Eval("MessageID") %>'  ReportTitle='<%# "Message board abuse report: " + Eval("MessageText") %>' CMSPanel-SecurityAccess="AuthenticatedUsers" /> 
            </td>
        </tr>
    </table>
</div>
<hr style="border: 1px solid #CCCCCC;"/>