<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><cms:usermenucontainer runat="server" ID="userMenuElem" MenuID="userContextMenu" Parameter='<%# Eval("UserID") %>' ContextMenuCssClass="UserContextMenu" >
<div class="memberSmall">
<div class="avatarSmall">
<a href="<%# HTMLEncode(GetMemberProfileUrl(Eval("UserName"))) %>" title="<%# HTMLEncode(TrimSitePrefix(GetNotEmpty("UserNickname;UserName"))) %>">
<%# GetUserAvatarImage(30, HTMLEncode(GetNotEmpty("UserNickname;UserName"))) %>
</a>
</div>
<div class="memberInfoSmall">
<h3><a href="<%# HTMLEncode(GetMemberProfileUrl(Eval("UserName"))) %>" title="<%# HTMLEncode(TrimSitePrefix(GetNotEmpty("UserNickname;UserName"))) %>"><%# HTMLEncode(TrimSitePrefix(GetNotEmpty("UserNickname;UserName"))) %></a></h3>
Gender: <%# GetGender(Eval("UserGender")) %><br />
Age: <%# GetAge(Eval("UserDateOfBirth"), "N/A") %>
</div>
</div>
</cms:usermenucontainer>