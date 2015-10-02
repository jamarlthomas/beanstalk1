<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSAdminControls/ContentRating/RatingControl.ascx" TagName="RatingControl" TagPrefix="cms" %>
<%@ Register Src="~/CMSModules/Ecommerce/Controls/ProductOptions/ShoppingCartItemSelector.ascx" TagName="CartItemSelector" TagPrefix="uc1" %>

<h1><%# EvalText("SKUName", true) %></h1>
<p><%# EvalText("SKUShortDescription") %></p>


<div class="content-primary">
  <ul data-inset="true" class="ui-listview" data-role="listview" data-theme="d">
    <%# (GetSKUIndicatorProperty("PublicStatusDisplayName") != null) ? "<li data-theme=\"e\"><h3><span class=\"left special\">" + HTMLEncode(GetSKUIndicatorProperty("PublicStatusDisplayName").ToString()) + "</span></h3><div class=\"clear\"></div></li>" : "" %>
    <li data-theme="d">
        <h3><span class="left">Rating:</span><span class="right"><cms:RatingControl ID="elemRating" runat="server" Enabled="false" RatingType="Stars" ExternalValue='<%# EvalDouble("DocumentRatingValue")/(EvalDouble("DocumentRatings") == 0?1:EvalDouble("DocumentRatings")) %>' /></span></h3>
        <div class="clear"></div>
    </li>
    <li data-theme="d">
        <h3><span class="left">Availability:</span><%# If(IsSKUAvailableForSale(), "<span class=\"right stock green\">In stock</span>", "<span class=\"right stock red\">Out of stock</span>") %></h3>
        <div class="clear"></div>
    </li>
    <%# If(GetSKUOriginalPrice() > 0, "<li data-theme=\"d\"><h3><span class=\"left\">List Price:</span><span class=\"right retail\">" + GetSKUFormattedOriginalPrice() + "<br/> You SAVE: " + GetSKUFormattedPriceSaving()+ "</span></h3><div class=\"clear\"></div></li>", "") %>
    <li data-theme="d">
        <h3><span class="left">Price:</span><span class="right"><%# GetSKUFormattedPrice() %></span></h3>
        <div class="clear"></div>
    </li>
  </ul>
</div>
<div class="mProductDetail">
     <uc1:CartItemSelector id="addItem" runat="server" SKUID='<%# EvalInteger("SKUID") %>' SKUEnabled='<%# EvalBool("SKUEnabled") %>' AddToCartTooltip="Add to cart" AddToCartLinkText="Add to cart" ShoppingCartUrl="~/basket" ShowUnitsTextBox="false" AlwaysShowTotalPrice="false" ShowProductOptions="true" StockVisible="false" UnavailableVariantInfoEnabled="false" CssClassNormal="normal" CssClassFade="fade" />
  <div class="imgCont ui-corner-all ui-shadow ui-body-d"><img src="<%# GetSKUImageUrl(500) %>" alt="<%# EvalText("SKUName", true) %>" /></div>
</div>