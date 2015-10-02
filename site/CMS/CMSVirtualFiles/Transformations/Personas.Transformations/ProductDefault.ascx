<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><table>
<tr>
<td>Product name:</td>
<td><%# Eval("DocumentName", true) %></td>
  
</tr>
<tr>
<td>Price:</td>
<td><%# GetSKUFormattedPrice(true, false) %></td>
</tr>
<tr>
<td>Description:</td>
<td><%# Eval("SKUDescription") %></td>
</tr>
<tr>
<td>Photo:</td>
<td><img src="<%# GetSKUImageUrl(200) %>" alt="<%# Eval("DocumentName", true) %> image" /></td>
</tr>
</table>