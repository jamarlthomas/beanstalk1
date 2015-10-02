<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSModules/Ecommerce/Controls/ProductOptions/ShoppingCartItemSelector.ascx" TagName="CartItemSelector" TagPrefix="uc1" %>
<%@ Register Src="~/CMSAdminControls/ContentRating/RatingControl.ascx" TagName="RatingControl" TagPrefix="cms" %>
<%@ Register Src="~/CMSWebParts/Text/QRCode.ascx" TagName="QRCode" TagPrefix="cms" %>
<%@ Register Src="~/CMSWebParts/TaggingCategories/CategoryList.ascx" TagName="CategoryList" TagPrefix="cms" %>
<div class="head">
  <img class="floatLeft" src="../App_Themes/EcommerceSite/Images/Ecommerce/print_logo.png" alt="eCommerce starter site" />
  <span class="floatRight"><%# GetAbsoluteUrl(GetDocumentUrl()) %></span>
  <div class="clear"></div>
</div>
<div class="name">
  <span class="floatLeft"><%# EvalText("SKUName", true) %></span>
  <div class="floatRight"><cms:QRCode ID="wQR" runat="server" MaxSideSize="70" Tooltip='<%# EvalText("SkuName") %>' AlternateText='<%# EvalText("SkuName") %>' Code='<%# ResolveMacros("{%SiteDomainName%}{%ApplicationPath%}/Mobile/Product-Detail/" + Eval("NodeAlias") + ".aspx") %>' /></div>
  <div class="clear"></div>
</div>
<div class="left floatLeft">
    <table class="main" cellpadding=0 cellspacing=0>
      <tr>
        <td class="bold">Brand:</td>
        <td><%# EvalText("SKU.SKUManufacturer.ManufacturerDisplayName", true) %></td>
      </tr>
      <tr>
        <td class="bold">In categories:</td>
        <td><cms:CategoryList ID="wCL" runat="server" TransformationName="EcommerceSite.Transformations.ProductInCategories" DisplayOnlyCategoryNames="true" AliasPath='<%# Eval("NodeAliasPath") %>' /></td>
      </tr>
      <tr>
        <td class="bold">Product rating:</td>
        <td><cms:RatingControl ID="elemRating" runat="server" Enabled="false" RatingType="Stars" ExternalValue='<%# EvalDouble("DocumentRatingValue")/(EvalDouble("DocumentRatings") == 0?1:EvalDouble("DocumentRatings")) %>' /></td>
      </tr>
      <tr>
        <%# (GetSKUIndicatorProperty("PublicStatusDisplayName") == null) ? "" : "<td class=\"bold\">Status:</td><td>" + HTMLEncode(GetSKUIndicatorProperty("PublicStatusDisplayName").ToString()) + "</td>" %>
      </tr>
      <tr>
        <td class="bold">Availability:</td>
        <td><%# If(IsSKUAvailableForSale(), "In stock", "Out of stock") %></td>
      </tr>
      <tr>
        <td colspan=2><uc1:CartItemSelector id="addItem" runat="server" SKUID='<%# EvalInteger("SKUID") %>' SKUEnabled='<%# EvalBool("SKUEnabled") %>'  ShowProductOptions="true" /><div class="clear"></div></td>
      </tr> 
      <% if(GetSKUOriginalPrice() > 0){ %>
      <tr>
        <td class="bold" style="padding-top: 13px;border-top: 1px solid black;">List price:</td>
        <td style="padding-top: 13px;border-top: 1px solid black;"><%# GetSKUFormattedOriginalPrice() %></td>
      </tr>
      <tr>
        <td class="bold">Your price:</td>
        <td><%# GetSKUFormattedPrice() %></td>
      </tr>
      <tr>
        <td class="bold">You save:</td>
        <td><%# GetSKUFormattedPriceSaving() + " (" + GetSKUPriceSaving(true) + "%)"  %></td>
      </tr>
      <% } %> 
    </table>
</div>
<div class="right floatRight">
  <table class="img">
    <tr>
      <td>
        <img src="<%# GetSKUImageUrl(200) %>" alt="<%# EvalText("SKUName", true) %>" />
      </td>
    </tr>
  </table>
</div>
<div class="clear"></div>
<div class="price">
  Total price: <span class="bold"><%# GetSKUFormattedPrice() %></span>
</div>
<div class="left floatLeft">
  <span class="heading">Description</span>
  <p><%# Localize(Eval("SKUShortDescription")) %></p>
  <p><%# Localize(Eval("SKUDescription")) %></p>
</div>
<div class="right floatRight" style="text-align: left;">
</div>
<div class="clear"></div>