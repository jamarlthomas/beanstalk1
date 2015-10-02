<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><table>
  <tr>
    <td>Document name:</td>
    <td><%# Eval("MenuItemName") %></td>
  </tr>
  <tr>
    <td>Teaser image:</td>
    <td><%# Eval("MenuItemTeaserImage") %></td>
  </tr>
  <tr>
    <td>Menu group:</td>
    <td><%# Eval("MenuItemGroup") %></td>
  </tr>
</table>
