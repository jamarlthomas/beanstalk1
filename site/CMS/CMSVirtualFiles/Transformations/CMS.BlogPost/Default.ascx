<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h1>
  <%# Eval("BlogPostTitle", true) %>
</h1>
<div class="BlogPBody TextContent">
  <%# Eval("BlogPostBody") %>
</div>
<div class="BlogPDateWhole">
    Posted: <span class="BlogPDate"><%# Eval("BlogPostDate") %></span> by 
<strong><%# BlogFunctions.GetUserFullName(Eval("DocumentCreatedByUserID")) %></strong> | with <a href="<%# GetDocumentUrl() %>"><%# BlogFunctions.GetBlogCommentsCount(Eval("DocumentID"),Eval("NodeAliasPath")) %> comments</a><br /><%# IfEmpty(Eval("DocumentTags"),"","Filed under: " + BlogFunctions.GetDocumentTags(Eval("DocumentTagGroupID"), Eval("DocumentTags"), "~/Blogs/My-blog-1.aspx")) %></div>
<br/>
<br/>
