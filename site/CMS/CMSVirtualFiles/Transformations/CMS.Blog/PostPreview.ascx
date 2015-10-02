<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="BlogPTitle"><a href="<%# GetDocumentUrl() %>">
  <%# Eval("BlogPostTitle", true) %></a>
</div>
<div class="BlogPBody TextContent">
  <%# Eval("BlogPostBody") %>
</div>
<div class="BlogPDateWhole">
    Posted: <span class="BlogPDate"><%# Eval("BlogPostDate") %></span> by 
<strong><%# BlogFunctions.GetUserFullName(Eval("DocumentCreatedByUserID")) %></strong> | with <a href="<%# GetDocumentUrl() %>#comments"><%# BlogFunctions.GetBlogCommentsCount(Eval("DocumentID"), Eval("NodeAliasPath")) %> comments</a></div>
<br/>
<br/>