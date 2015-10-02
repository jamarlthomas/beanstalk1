<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><div class="SmartResult">
	<img src="<%# GetSearchImageUrl("/CMSModules/CMS_SmartSearch/no_image.gif",90) %>" alt="" />

  <div class="Content">  
	<a style="font-weight: bold" href='<%# GetUrl("/Examples/Web-parts/Custom-tables/Custom-table-repeater", null) %>?ItemID=<%# GetSearchValue("ItemID") %>'>
        <%# SearchHighlight(HTMLHelper.HTMLEncode(DataHelper.GetNotEmpty(Eval("Title"), "/")),"<span style=\"font-weight:bold;\">","</span>") %>
        </a>
  
	<%# SearchHighlight(HTMLHelper.HTMLEncode(TextHelper.LimitLength(HttpUtility.HtmlDecode(HTMLHelper.StripTags(GetSearchedContent(DataHelper.GetNotEmpty(Eval("Content"), "")), false, " ")), 280, "...")),"<span style=\"background-color: #FEFF8F\">","</span>") %><br />

                <%-- Relevance --%>
                <div title="<%# "Relevance: " + Convert.ToInt32(ValidationHelper.GetDouble(Eval("Score"),0.0)*100)  + "%" %>"
                    style="width: 50px; border: solid 1px #aaaaaa; margin-top: 7px; margin-right: 6px;
                    float: left; color: #0000ff; font-size: 2pt; line-height: 4px; height: 4px;">
                    <div style="<%# "background-color:#a7d3a7;width:"+ Convert.ToString(Convert.ToInt32((ValidationHelper.GetDouble(Eval("Score"),0.0)/2)*100))  + "px;height:4px;line-height: 4px;"%>">
                    </div>
                </div>
                <%-- URL --%>
                <span style="color: #008000">
                    <%# TextHelper.BreakLine(SearchHighlight(URLHelper.GetAbsoluteUrl(GetUrl("/Examples/Webparts/Custom-tables/Custom-table-repeater", null))+"?ItemID=" + GetSearchValue("ItemID"),"<strong>","</strong>"),75,"<br />") %>
                </span>
                <%-- Creation --%>
                <span style="padding-left:5px;;color: #888888; font-size: 9pt">
                    <%# GetDateTimeString(ValidationHelper.GetDateTime(Eval("Created"), DateTimeHelper.ZERO_TIME), true) %>
                </span>
   </div> 
</div>
