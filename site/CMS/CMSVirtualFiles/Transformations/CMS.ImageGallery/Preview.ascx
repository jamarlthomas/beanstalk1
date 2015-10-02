<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><table>
<tr>
<td>Name:</td>
<td><%# Eval("GalleryName",true) %></td>
</tr>
<tr>
<td>Description:</td>
<td><%# Eval("GalleryDescription") %></td>
</tr>
<tr>
<td>Teaser image:</td>
<td><%# Eval("GalleryTeaserImage") %></td>
</tr>
</table>
