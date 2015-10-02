<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_Ecommerce_Checkout_Viewers_ShoppingCartTotals_CMSWebDeploy_649" CodeFile="~/CMSVirtualFiles/WebPartLayouts/ShoppingCartTotals/E-commerceSite-Totals.ascx.cs" %>

<div id="totalViewer" class="TotalViewer" runat="server" visible="false">
        <asp:Label ID="lblLabel" Visible="false" runat="server" />
        <asp:Label ID="lblValue" CssClass="right" runat="server" />
</div>
<cms:BasicUniView runat="server" ID="uvMultiBuySummary" Visible="false" />