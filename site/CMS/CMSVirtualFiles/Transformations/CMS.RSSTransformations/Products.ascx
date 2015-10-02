<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><item>
  <guid isPermaLink="false"><%# Eval("SKUGUID") %></guid>
  <title><%# EvalCDATA("SKUName") %></title>
  <description><%# EvalCDATA("SKUDescription") %></description>
  <pubDate><%# GetRSSDateTime(Eval("SKUCreated")) %></pubDate>
  <link><![CDATA[<%# GetAbsoluteUrl(GetProductUrlForFeed(Eval("SKUGUID"),Eval("SKUName"),Eval("SiteName")),EvalText("SiteName")) %>]]></link>
</item>