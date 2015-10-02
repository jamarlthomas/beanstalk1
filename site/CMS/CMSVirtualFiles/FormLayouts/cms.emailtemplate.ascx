<%@ Control Language="C#" Inherits="CMS.FormControls.CMSAbstractFormLayout" %> 
<%@ Register TagPrefix="cms" Namespace="CMS.FormControls" Assembly="CMS.FormControls" %>
<cms:FormCategory runat="server" ID="cGeneral" ShortID="cG" CategoryTitleResourceString="general.general" DefaultFieldLayout="TwoColumns">
  <cms:FormField runat="server" ID="iEmailTemplateDisplayName" Field="EmailTemplateDisplayName" />
  <cms:FormField runat="server" ID="iEmailTemplateName" Field="EmailTemplateName" />
  <cms:FormField runat="server" ID="iEmailTemplateType" Field="EmailTemplateType" />
  <cms:FormField runat="server" ID="iEmailTemplateFrom" Field="EmailTemplateFrom" />
  <cms:FormField runat="server" ID="iEmailTemplateCc" Field="EmailTemplateCc" />
  <cms:FormField runat="server" ID="iEmailTemplateBcc" Field="EmailTemplateBcc" />
</cms:FormCategory>

<cms:FormCategory runat="server" ID="cSubject" ShortID="cS" CategoryTitleResourceString="general.subject" DefaultFieldLayout="TwoColumns">
  <cms:FormField runat="server" ID="iEmailTemplateSubject" Field="EmailTemplateSubject" DisplayLabel="false" />
</cms:FormCategory>

<cms:FormCategory runat="server" ID="cText" ShortID="cT" CategoryTitleResourceString="emailtemplate_edit.htmlversion" DefaultFieldLayout="TwoColumns">
  <cms:FormField ID="fEmailTemplateText" runat="server" Field="EmailTemplateText" DisplayLabel="false" />
</cms:FormCategory>

<cms:FormCategory runat="server" ID="cPlainText" ShortID="cPt" CategoryTitleResourceString="emailtemplate_edit.plaintextversion" DefaultFieldLayout="TwoColumns">
  <cms:FormField ID="fEmailTemplatePlainText" runat="server" Field="EmailTemplatePlainText" DisplayLabel="false" />
</cms:FormCategory>

<cms:FormSubmit runat="server" ID="fSubmit" />