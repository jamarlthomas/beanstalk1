<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="smart-search">
  <div class="title">
    <strong>
      <a href="<%# "javascript:SelectItem(" + CMS.ExtendedControls.ControlsHelper.RemoveDynamicControls(ValidationHelper.GetString(GetSearchValue("nodeId"), "")) + ", '"+ ValidationHelper.GetString(GetSearchValue("DocumentCulture"), "") + "')" %>">
        <%#SearchHighlight(HTMLHelper.HTMLEncode(DataHelper.GetNotEmpty(Eval("Title"), "/")), "<span class=\"highlight\">", "</span>")%> (<%#ValidationHelper.GetString(GetSearchValue("DocumentCulture"), "")%>)
      </a>
    </strong>
  </div>
  <div class="text">
    <%#SearchHighlight(HTMLHelper.HTMLEncode(TextHelper.LimitLength(HttpUtility.HtmlDecode(HTMLHelper.StripTags(CMS.ExtendedControls.ControlsHelper.RemoveDynamicControls(GetSearchedContent(DataHelper.GetNotEmpty(Eval("Content"), ""))), false, " ")), 280, "...")), "<span class=\"highlight\">", "</span>")%>
  </div>
  <div class="footer">
    <span class="url">
      <%# SearchHighlight(SearchResultUrl(true),"<span class=\"highlight\">","</span>") %>
    </span>
    <span class="date">
      <%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("Created"), DateTimeHelper.ZERO_TIME), true) %>
    </span>
  </div>
</div>