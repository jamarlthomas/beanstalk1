<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_Ecommerce_Wishlist_CMSWebDeploy_223"    CodeFile="~/CMSVirtualFiles/WebPartLayouts/Wishlist/Simple.ascx.cs" %>
<div class="WishlistTable">                          
  <div class="CartStepBody">
    <asp:Label ID="lblTitle" runat="server" Visible="false" EnableViewState="false" />
    <asp:Panel ID="pnlWishlist" runat="server" CssClass="CartStepPanel">
    <asp:Panel ID="pnlWishlistInner" runat="server" CssClass="CartStepInnerPanel" >
      <asp:Label ID="lblInfo" runat="server" CssClass="WishlistInfo" EnableViewState="false" Visible="false" />
        <cms:queryrepeater id="repeater" runat="server" />
      </asp:Panel>
    </asp:Panel>
  </div>
  <div class="btnContinue">
    <cms:CMSButton ID="btnContinue" runat="server" OnClick="btnContinue_Click" CssClass="LongButton" />
  </div>
</div>
<asp:Literal ID="ltlScript" runat="server" EnableViewState="false" />