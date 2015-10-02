<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><h1><%# Eval("PressReleaseTitle",true) %></h1>
<p>
<strong>Release date: <%# GetDate("PressReleaseDate") %></strong>
</p>
<p>
<strong><%# Eval("PressReleaseSummary") %></strong>
</p>
<p><%# Eval("PressReleaseText") %></p>
<p><%# Eval("PressReleaseAbout") %></p>
<p><%# Eval("PressReleaseTrademarks") %></p>
