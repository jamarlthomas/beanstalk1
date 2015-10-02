<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><strong><a href="#FAQLink<%# Eval("FAQID") %>" id="FAQLink<%# Eval("FAQID") %>" onclick="javascript: if (document.getElementById('FAQ<%# Eval("FAQID") %>').style.display == 'none') {document.getElementById('FAQ<%# Eval("FAQID") %>').style.display = 'block'} else {document.getElementById('FAQ<%# Eval("FAQID") %>').style.display = 'none'};"><%# Eval("FAQQuestion",true) %></a></strong><br />
<div id="FAQ<%# Eval("FAQID") %>" style="display:none">
<%# Eval("FAQAnswer") %><br/>
</div>