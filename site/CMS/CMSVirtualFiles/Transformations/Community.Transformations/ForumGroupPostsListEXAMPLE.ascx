<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="blogsHome">
<h4>
<a href="<%# ForumFunctions.GetPostURL("/Groups/Czech_Republic_fans/Forums",Eval("PostIDPath"), Eval("PostForumID")) %>"><%# Eval("PostSubject",true) %></a>
</h4>
<div>
<%#  StripTags(LimitLength(RemoveDynamicControls(RemoveDiscussionMacros(Eval("PostText"))), 300, "...")) %>
</div>
<div class="date">Posted on <strong><%# Eval("PostTime") %></strong></div>
</div>