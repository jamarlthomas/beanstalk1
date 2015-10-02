<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><asp:PlaceHolder runat="server" ID="plcFirstPage"></asp:PlaceHolder>
<asp:PlaceHolder runat="server" ID="plcPreviousPage"></asp:PlaceHolder>&nbsp;
<asp:PlaceHolder runat="server" ID="plcPreviousGroup"></asp:PlaceHolder>
<asp:PlaceHolder runat="server" ID="plcPageNumbers"></asp:PlaceHolder>
<asp:PlaceHolder runat="server" ID="plcNextGroup"></asp:PlaceHolder>&nbsp;
<asp:PlaceHolder runat="server" ID="plcNextPage"></asp:PlaceHolder>
<asp:PlaceHolder runat="server" ID="plcLastPage"></asp:PlaceHolder>
<asp:PlaceHolder runat="server" ID="plcDirectPage"></asp:PlaceHolder>
<%-- Results <%# Eval("FirstOnPage")%> - <%# Eval("LastOnPage") %> of <%# Eval("Items")%><br /> --%>
 Pages:  <%# Eval("CurrentPage") %> of <%# Eval("Pages") %><br /> 
