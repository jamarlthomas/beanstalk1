<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><table>
<tr>
<td width="60" valign="top">
<%# IfEmpty(Eval("ArticleTeaserImage"), "", "<img alt=\"" + Eval("ArticleName",true) + "\" src=\"" + GetFileUrl("ArticleTeaserImage") + "?maxsidesize=50\" />") %></td>
<td>
<h2><a href="<%# GetDocumentUrl() %>"><%# Eval("ArticleName",true) %></a></h2>
<p><%# Eval("ArticleTeaserText") %></p>
</td>
</tr>
</table>