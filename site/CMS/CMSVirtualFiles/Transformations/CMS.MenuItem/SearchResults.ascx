﻿<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMS.Controls.CMSTransformation" %><%@ Register TagPrefix="cms" Namespace="CMS.Controls" Assembly="CMS.Controls" %>
<%@ Register TagPrefix="cc1" Namespace="CMS.Controls" Assembly="CMS.Controls" %> <a href=" <%# Eval("NodeAliasPath") %>"> <strong><%# Eval("SearchResultName",true) %><br /></strong></a>
Modified when: <%# Eval("DocumentModifiedWhen") %><br /><br /><br />