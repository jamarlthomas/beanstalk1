<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h2><%# Eval("Title") %></h2>
<p><%# Eval("Description") %></p>
<%-- The Author is a lookup field containing ID and value separated by semicolon --%>
Author: <%# Eval("Author").ToString().Split(new[]{';'})[1] %><br />
(Created on: <%# Eval("Created") %>)<br />
<a href="?pictureId=<%# Eval("ID") %>" title="See original size">
<img src="<%# GetSharePointImageUrl("FileRef", null, 150) %>" />
</a>
<h5>Keywords</h5>
<%# Eval("Keywords") %>