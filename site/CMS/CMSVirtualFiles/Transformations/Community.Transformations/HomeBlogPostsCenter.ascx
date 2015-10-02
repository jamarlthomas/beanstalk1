<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="blogsHome">
<h4>
<a href="<%# GetDocumentUrl() %>"><%# Eval("BlogPostTitle",true) %></a>
</h4>
<div>
<%# StripTags(Eval("BlogPostSummary")) %>
</div>
<div class="date">Posted on <strong><%# Eval("BlogPostDate") %></strong></div>
</div>