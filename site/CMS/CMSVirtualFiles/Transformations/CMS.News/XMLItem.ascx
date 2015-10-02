<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><CMS_News>
  <NewsID><%# EvalCDATA("NewsID") %></NewsID>
  <NewsTitle><%# EvalCDATA("NewsTitle") %></NewsTitle>
  <NewsReleaseDate><%# EvalCDATA("NewsReleaseDate") %></NewsReleaseDate>
  <NewsSummary><%# EvalCDATA("NewsSummary") %></NewsSummary>
  <NewsText><%# EvalCDATA("NewsText") %></NewsText>
</CMS_News>

