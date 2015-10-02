<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%@ Register Src="~/CMSModules/Ecommerce/Controls/ProductOptions/ShoppingCartItemSelector.ascx" TagName="CartItemSelector" TagPrefix="uc1" %>
<h1><%# EvalText("SKUName", true) %></h1>
<div class="productDetail">
<div class="productImage">
<img src="<%# GetSKUImageUrl(200) %>" alt="<%# EvalText("SKUName", true) %> image" />
</div>
<div class="productDescription">
<h3>Product description</h3>
<div class="TextContent productDetailDescription">
<%# Eval("SKUDescription") %>
</div>
<div class="ourPrice listBoxHead">Our price: <span class="ProductPrice"><%# GetSKUFormattedPrice() %></span></div>
<div class="addToCart contentBox">
<uc1:CartItemSelector id="cartItemSelector" runat="server" SKUID='<%# ValidationHelper.GetInteger(Eval("SKUID"), 0) %>' SKUEnabled='<%# ValidationHelper.GetBoolean(Eval("SKUEnabled"), false) %> ' AddToCartImageButton="addtocart.gif" AddToCartLinkText="Add to shopping cart" ShowProductOptions="true" ShowDonationProperties="true" ShowUnitsTextBox="true"/>
<div class="addToWishlist">
<%# EcommerceFunctions.GetAddToWishListLink(Eval("NodeSKUID"), "~/App_Themes/CorporateSite/Images/addtowishlist.png") %>
</div>  
</div>
</div>
<div class="clear"></div>
</div>