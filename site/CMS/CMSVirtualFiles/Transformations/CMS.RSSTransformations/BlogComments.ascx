<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><item>
    <guid isPermaLink="false">
        <%# ValidationHelper.GetString(Eval("CommentID"),string.Empty).PadLeft(10,'0') %></guid>
    <title>
        <![CDATA[<%# TextHelper.LimitLength(HttpUtility.HtmlDecode(ValidationHelper.GetString(EvalCDATA("CommentText",false),string.Empty)),100) %>]]></title>
    <description>
        <![CDATA[
        <strong>
            <%# EvalCDATA("CommentUserName",false) %></strong>
        <br /><%# EvalCDATA("CommentText",false) %>]]></description>
        <pubDate>
            <%# GetRSSDateTime(Eval("CommentDate")) %></pubDate>
        <link>
            <![CDATA[<%# GetAbsoluteUrl(GetBlogCommentUrlForFeed(EvalInteger("CommentPostDocumentID")), Eval("SiteName")) %>]]></link>
    </item>