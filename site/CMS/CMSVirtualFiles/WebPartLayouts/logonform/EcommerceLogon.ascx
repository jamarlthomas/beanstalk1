<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_Membership_Logon_LogonForm_CMSWebDeploy_379"
CodeFile="~/CMSVirtualFiles/WebPartLayouts/logonform/EcommerceLogon.ascx.cs" %>
  <asp:Panel ID="pnlBody" runat="server" CssClass="LogonPageBackground">
    <asp:Login ID="Login1" runat="server" DestinationPageUrl="~/Default.aspx">
      <LayoutTemplate>
        <asp:Panel runat="server" ID="pnlLogin" DefaultButton="LoginButton">
          <table class="logon">
            <tr>
				<td colspan="3">
					<cms:LocalizedLabel ID="lblTokenInfo" runat="server" EnableViewState="False" Visible="false" />
				</td>
            </tr>
			<asp:PlaceHolder runat="server" ID="plcTokenInfo" Visible="false">
				<tr>
					<td class="logon-label">
						<cms:LocalizedLabel ID="lblTokenIDlabel" runat="server" ResourceString="mfauthentication.label.token" />
					</td>
					<td class="token-label">
						<cms:LocalizedLabel ID="lblTokenID" runat="server" />
					</td>
				</tr>
			</asp:PlaceHolder>
			<asp:PlaceHolder runat="server" ID="plcLoginInputs">
				<tr>
				  <td class="label"><cms:LocalizedLabel ID="lblUserName" runat="server" Text="E-mail (user name)" AssociatedControlID="UserName" EnableViewState="false" /></td>
				  <td class="input"><cms:CMSTextBox ID="UserName" runat="server" MaxLength="100" CssClass="LogonTextBox" /><cms:CMSRequiredFieldValidator ID="rfvUserNameRequired" runat="server" ControlToValidate="UserName" EnableViewState="false" Display="Dynamic">*</cms:CMSRequiredFieldValidator></td>
				</tr>
				<tr>
				  <td class="label"><cms:LocalizedLabel ID="lblPassword" runat="server" AssociatedControlID="Password" EnableViewState="false" /></td>
				  <td class="input"><cms:CMSTextBox ID="Password" runat="server" TextMode="Password" MaxLength="110" CssClass="LogonTextBox" /></td>
				</tr>
			</asp:PlaceHolder>
            <asp:PlaceHolder runat="server" ID="plcPasscodeBox" Visible="false">
				<tr>
					<td style="white-space: nowrap;">
						<cms:LocalizedLabel ID="lblPasscode" runat="server" AssociatedControlID="txtPasscode" ResourceString="mfauthentication.label.passcode" />
					</td>
					<td>
						<cms:CMSTextBox ID="txtPasscode" runat="server" MaxLength="110" />
					</td>
				</tr>
			</asp:PlaceHolder>
			<tr>
              <td></td>
              <td class="remember"><cms:CMSCheckBox ID="chkRememberMe" runat="server" /></td>
            </tr>
            <tr>
              <td colspan="2"><cms:LocalizedLabel ID="FailureText" runat="server" EnableViewState="False" CssClass="ErrorLabel" /></td>
            </tr>
            <tr>
              <td></td>
              <td><cms:LocalizedButton ID="LoginButton" runat="server" CommandName="Login" EnableViewState="false" /></td>
            </tr>
          </table>
        </asp:Panel>
      </LayoutTemplate>
    </asp:Login>
    <div class="forgottenPwd">
      <cms:CMSUpdatePanel runat="server" ID="pnlUpdatePasswordRetrievalLink" UpdateMode="Conditional">
        <ContentTemplate>
          <asp:LinkButton ID="lnkPasswdRetrieval" runat="server" EnableViewState="false" onclick="lnkPasswdRetrieval_Click" />
        </ContentTemplate>
      </cms:CMSUpdatePanel>   
      <cms:CMSUpdatePanel runat="server" ID="pnlUpdatePasswordRetrieval" UpdateMode="Conditional">
        <ContentTemplate>
          <asp:Panel ID="pnlPasswdRetrieval" runat="server" CssClass="LoginPanelPasswordRetrieval" DefaultButton="btnPasswdRetrieval" Visible="False">
            <asp:Label ID="lblPasswdRetrieval" runat="server" EnableViewState="false" AssociatedControlID="txtPasswordRetrieval" />
            <cms:CMSTextBox ID="txtPasswordRetrieval" runat="server" /><br /><br />
            <cms:CMSButton ID="btnPasswdRetrieval" runat="server" EnableViewState="false" /><br />
            <cms:CMSRequiredFieldValidator ID="rqValue" runat="server" ControlToValidate="txtPasswordRetrieval" EnableViewState="false" /><br />
            <span class="ErrorLabel"><asp:Label ID="lblResult" runat="server" Visible="false" EnableViewState="false" /></span>
          </asp:Panel>
        </ContentTemplate>
        <Triggers>
          <asp:AsyncPostBackTrigger EventName="Click" ControlID="lnkPasswdRetrieval" />
        </Triggers>
      </cms:CMSUpdatePanel>
    </div>
  </asp:Panel>