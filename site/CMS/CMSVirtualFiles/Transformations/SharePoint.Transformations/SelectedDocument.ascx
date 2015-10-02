<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><strong>Document <%# Eval("ows_LinkFilename") %></strong><br />
Id: <%# Eval("ows_ID") %> <br/>
Modified: <%# Eval("ows_Modified") %> <br/>
Created: <%# SharePointFunctions.SplitSharePointField(EvalHTML("ows_Created Date"),1) %> <br/>
Location: <%# SharePointFunctions.SplitSharePointField(EvalHTML("ows_FileRef"),1) %> <br/>

