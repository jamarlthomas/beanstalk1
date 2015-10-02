<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div style="float:left"><a href="<%# Functions.GetUrl(Functions.GetAliasPath()) + "?eventid=" + Eval("NodeID") %>" ><%# Eval("EventName", true) %></a></div>
<div style="float:right"><%# GetEventDateString(Eval("EventDate"),Eval("EventEndDate"),Eval<bool>("EventAllDay")) %></div>
<div style="clear:both; height:0px; line-height:0px;">&nbsp;</div>