<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="TopContributors">
  <div style="float:left;" class="UserName">
    <%#IfEmpty(GetUserProfileURL(Eval("UserName")), "", "<a href='" + HTMLEncode(GetUserProfileURL(Eval("UserName"))) + "'>")%>
      <%# HTMLEncode(GetNotEmpty("UserNickname;UserName")) %>
    <%# IfEmpty(GetUserProfileURL(Eval("UserName")), "", "</a>") %>
  </div>
  <div style="float:right;" class="PostCount"><%# ValidationHelper.GetInteger(Eval("UserForumPosts"), 0) %></div>
  <div style="clear:both;"></div>
</div>