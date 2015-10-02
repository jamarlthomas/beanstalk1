<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h1 class="BlogPTitleDetail">
  <%# Eval("BlogPostTitle",true) %>
</h1>
<div class="BlogPBodyDetail textContent">
<div class="summary">
  <%# IfEmpty(Eval("BlogPostTeaser"),"","<div class=\"teaser\"><img src=\""+GetFileUrl("BlogPostTeaser")+"?maxsidesize=66\" alt=\""+Eval("BlogPostTitle",true)+" \" /></div>") %>
<div class="BlogPostSummaryText"><%# Eval("BlogPostSummary") %></div>
<br class="clear" />
</div>
  <%# Eval("BlogPostBody") %>
  <div class="clear">&nbsp;</div>
</div>
<div class="BlogPDateWhole">
    Posted by <a href="~/Members/<%# BlogFunctions.GetUserName(Eval("NodeOwner")) %>.aspx"><strong><%# BlogFunctions.GetUserFullName(Eval("NodeOwner")) %></strong></a> on <span class="BlogPDate"><%# Eval("BlogPostDate") %></span></div><div class="BlogTagsWhole">
<%# IfEmpty(Eval("DocumentTags"),"","Filed under: " + BlogFunctions.GetDocumentTags(Eval("DocumentTagGroupID"), Eval("DocumentTags"), "~/Blogs/Blog-posts.aspx")) %></div>
<br/>
<br/>