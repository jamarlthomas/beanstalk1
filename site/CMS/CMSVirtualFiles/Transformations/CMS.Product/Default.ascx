<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><table>
<tr>
<td>Product name:</td>
<td><%# Eval("DocumentName", true) %></td>
   <a href="<%# GetDocumentUrl() %>" title="See detail of <%# EvalText("SKUName", true) %>"><h2><%# LimitLength(EvalText("SKUName", true), 45, "...") %></h2></a>
</tr>
<tr>
  <h1>
<td>Price:</td>
<td><%# GetSKUFormattedPrice() %></td>
<td><%# GetSKUFormattedOriginalPrice() %></td>
<td><%# GetSKUFormattedPriceSaving() %></td>
</tr>
  </h1>
<tr>
<td>Description:</td>
<td><%# Eval("SKUDescription") %></td>
</tr>
<tr>
<td>Photo:</td>
<td><img src="<%# GetSKUImageUrl(200) %>" alt="<%# Eval("DocumentName", true) %> image" /></td>
</tr>
</table>
