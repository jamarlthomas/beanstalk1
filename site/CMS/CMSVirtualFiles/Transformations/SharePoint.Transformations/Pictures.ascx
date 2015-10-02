<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %><%# SharePointFunctions.SplitSharePointField(EvalHTML("ows_FileLeafRef"),1) %><br/>
  <img src="<%# SharePointFunctions.GetSharePointFileUrl("server_name", SharePointFunctions.SplitSharePointField(EvalHTML("ows_FileRef"),1)) %>&maxsidesize=200" /> <br />
