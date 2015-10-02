<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h2>

 <a href="<%# Eval("link")%>">

 <%# Eval("title") %>

 </a>

</h2>

<p>

 <strong>Published</strong>: <%# Eval("pubdate") %>

</p>

<p>

 <%# Eval("description") %>

</p>

<br/>