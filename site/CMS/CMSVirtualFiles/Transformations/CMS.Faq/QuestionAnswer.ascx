<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><a name="FAQ<%# Eval("FAQID") %>"></a><strong><%# Eval("FAQQuestion",true) %></strong><br />
<%# Eval("FAQAnswer") %><br/>
<br />&nbsp;<br />