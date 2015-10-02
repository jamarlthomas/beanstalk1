<%@ Control Language="C#" AutoEventWireup="true"  Inherits="CMSWebParts_Search_cmscompletesearchdialog_CMSWebDeploy_121"    CodeFile="~/CMSVirtualFiles/WebPartLayouts/cmscompletesearchdialog/filter.ascx.cs" %>
<div class="SearchDialog">
    <cms:CMSSearchDialog ID="srchDialog" runat="server" />
</div>
<div class="SearchResults">
    <cms:CMSSearchResults ID="srchResults" runat="server" FilterName="SearchDialog" />
</div>