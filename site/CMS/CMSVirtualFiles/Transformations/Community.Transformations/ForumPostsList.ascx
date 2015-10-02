<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSModules/AbuseReport/Controls/InlineAbuseReport.ascx" TagName="AbuseReport" TagPrefix="cms" %>

<div class="blogsHome">
<h4>
<a href="<%# ForumFunctions.GetPostURL(Eval("PostIDPath"), Eval("PostForumID")) %>"><%# Eval("PostSubject", true) %></a>
</h4>
<div>
<%# LimitLength(StripTags(RemoveDynamicControls(RemoveDiscussionMacros(Eval("PostText")))), 300, "...") %>
</div>
<div class="date" style="float: left;">Posted on <strong><%# GetDateTime("PostTime") %></strong></div>
<div class="ForumReportAbuse" style="float: right;">
<cms:AbuseReport ID="InlineAbuseReport" runat="server" ReportObjectType="Forums.ForumPost" ReportObjectID='<%# Eval("PostId") %>'  ReportTitle='<%# "Forum post abuse report: " + StripTags(Eval("PostText")) %>' CMSPanel-SecurityAccess="AuthenticatedUsers" /> 
</div>
</div>
<br /><br />