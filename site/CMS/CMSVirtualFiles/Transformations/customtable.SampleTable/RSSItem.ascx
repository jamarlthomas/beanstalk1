<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><item>
  <guid isPermaLink="false"><%# Eval("ItemGUID") %></guid>
  <title><%# EvalCDATA("ItemText") %></title>
  <description><%# EvalCDATA("ItemText") %></description>
  <pubDate><%# GetRSSDateTime(Eval("ItemCreatedWhen")) %></pubDate>
  <link><![CDATA[<%# GetAbsoluteUrl("~/Examples/Web-parts/Custom-tables/Custom-table-repeater.aspx?itemid=" + Eval("ItemID")) %>]]></link>
</item>

