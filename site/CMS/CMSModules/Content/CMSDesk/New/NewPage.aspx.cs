using System;

using CMS.Core;
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.LicenseProvider;
using CMS.Membership;
using CMS.PortalEngine;
using CMS.Base;
using CMS.DocumentEngine;
using CMS.SiteProvider;
using CMS.UIControls;
using CMS.PortalControls;
using CMS.DataEngine;

public partial class CMSModules_Content_CMSDesk_New_NewPage : CMSContentPage
{
    #region "Variables"

    private string mode;

    private string pageClassName = "CMS.MenuItem";

    #endregion


    #region "Properties"

    /// <summary>
    /// Messages placeholder
    /// </summary>
    public override MessagesPlaceHolder MessagesPlaceHolder
    {
        get
        {
            return plcMess;
        }
    }


    private DataClassInfo NewNodeClass
    {
        get
        {
            if (DocumentManager.NewNodeClassID > 0)
            {
                return DocumentManager.NewNodeClass;
            }
            return null;
        }
    }
    #endregion


    #region "Page events"

    protected override void OnPreInit(EventArgs e)
    {
        base.OnPreInit(e);

        mode = QueryHelper.GetString("mode", string.Empty);
        if (mode.ToLowerCSafe() == "productssection")
        {
            string url = ResolveUrl("~/CMSModules/Content/CMSDesk/Edit/Edit.aspx" + RequestContext.CurrentQueryString);
            URLHelper.Redirect(url);
        }

        if (RequiresDialog)
        {
            // Use simple master page if dialog mode required
            Page.MasterPageFile = ResolveUrl("~/CMSMasterPages/UI/Dialogs/ModalSimplePage.master");
        }

        DocumentManager.OnValidateData += DocumentManager_OnValidateData;
        DocumentManager.OnSaveData += DocumentManager_OnSaveData;

        DocumentManager.Mode = FormModeEnum.Insert;
        DocumentManager.ParentNodeID = QueryHelper.GetInteger("parentnodeid", 0);
        DocumentManager.NewNodeCultureCode = QueryHelper.GetString("parentculture", null);
        DocumentManager.NewNodeClassID = QueryHelper.GetInteger("classId", 0);

        // Set up the document conversion
        int convertDocumentId = QueryHelper.GetInteger("convertdocumentid", 0);
        if (convertDocumentId > 0)
        {
            DocumentManager.SourceDocumentID = convertDocumentId;
            DocumentManager.Mode = FormModeEnum.Convert;
        }

        // Load proper class name
        DataClassInfo dci = NewNodeClass;
        if (dci != null)
        {
            pageClassName = dci.ClassName;
        }

        // Check if user is allowed to create page under this node
        if (!MembershipContext.AuthenticatedUser.IsAuthorizedToCreateNewDocument(DocumentManager.ParentNodeID, pageClassName))
        {
            RedirectToAccessDenied(GetString("cmsdesk.notauthorizedtocreatedocument"));
        }

        // Check license limitations
        if (!LicenseHelper.LicenseVersionCheck(RequestContext.CurrentDomain, FeatureEnum.Documents, ObjectActionEnum.Insert))
        {
            RedirectToAccessDenied(String.Format(GetString("cmsdesk.documentslicenselimits"), string.Empty));
        }
    }


    protected override void OnInit(EventArgs e)
    {
        // Load the root category of the selector
        DataClassInfo dci = NewNodeClass;
        if (dci != null)
        {
            selTemplate.RootCategory = dci.ClassPageTemplateCategoryID;
            if (!RequestHelper.IsPostBack() && (dci.ClassDefaultPageTemplateID > 0))
            {
                selTemplate.SetDefaultTemplate(dci.ClassDefaultPageTemplateID);
            }

            if (dci.ClassName.EqualsCSafe("cms.wireframe", true) && PortalHelper.IsWireframingEnabled(SiteContext.CurrentSiteName))
            {
                selTemplate.IsWireframe = true;
            }
        }

        // Display footer only in dialog mode
        pnlFooterContent.Visible = RequiresDialog;
        
        base.OnInit(e);
    }


    protected void Page_Load(object sender, EventArgs e)
    {
        menuElem.OnGetClientValidationScript += menuElem_OnGetClientValidationScript;

        // Register script files
        ScriptHelper.RegisterLoader(this);
        ScriptHelper.RegisterEditScript(Page, false);

        txtPageName.MaxLength = TreePathUtils.GetMaxNameLength(DocumentManager.NewNodeClassName);

        if (DocumentManager.ParentNode != null)
        {
            selTemplate.DocumentID = DocumentManager.ParentNode.DocumentID;
            selTemplate.ParentNodeID = DocumentManager.ParentNodeID;
        }

        // Hide error label
        lblError.Style.Add("display", "none");

        // Set default focus on page name field
        if (!RequestHelper.IsPostBack())
        {
            if (DocumentManager.Mode == FormModeEnum.Convert)
            {
                txtPageName.Text = DocumentManager.Node.DocumentName;
            }
            txtPageName.Focus();
        }
    }


    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);
        
        // For blank page and page template selector - focus page name text box to proper ctrl+c function.
        if ((selTemplate.TemplateSelectionState == 1) || (selTemplate.TemplateSelectionState == 3))
        {
            txtPageName.Focus();
        }

        // Set dialog title
        if (RequiresDialog)
        {
            SetTitle(HTMLHelper.HTMLEncode(String.Format(GetString("content.newdocument"), NewNodeClass.ClassDisplayName)));
            
            // Turn off fixed position in dialog to avoid blank gap in page
            pnlContainer.FixedPosition = false;
        }
        else
        {
            titleElem.TitleText = HTMLHelper.HTMLEncode(String.Format(GetString("content.newdocument"), NewNodeClass.ClassDisplayName));
            EnsureDocumentBreadcrumbs(titleElem.Breadcrumbs, action: titleElem.TitleText);
        }
    }

    #endregion


    #region "Other events"

    protected void menuElem_OnGetClientValidationScript(object sender, CMS.Controls.EditMenuEventArgs e)
    {
        switch (e.ActionName)
        {
            case ComponentEvents.SAVE:
                string jsValidation = String.Format(@"
function ValidateNewPage(){{
    var value = document.getElementById('{0}').value;
    value = value.replace(/^\\s+|\\s+$/g, '');
    var errorLabel = document.getElementById('{1}');
    if (value == '') {{
        errorLabel.style.display = ''; 
        errorLabel.innerHTML  = {2};
        resizearea(); 
        return false;
    }}
    {3}
    return true;
}}", txtPageName.ClientID, lblError.ClientID, ScriptHelper.GetString(GetString("newpage.nameempty")), selTemplate.GetValidationScript());

                // Register validate script
                ScriptHelper.RegisterClientScriptBlock(this, typeof(string), "ValidateNewPage", ScriptHelper.GetScript(jsValidation));

                e.ValidationScript = "ValidateNewPage()";
                break;
        }
    }


    protected void DocumentManager_OnSaveData(object sender, DocumentManagerEventArgs e)
    {
        e.UpdateDocument = false;

        string errorMessage = null;
        string newPageName = txtPageName.Text.Trim();

        if (!String.IsNullOrEmpty(newPageName))
        {
            // Limit length
            newPageName = TreePathUtils.EnsureMaxNodeNameLength(newPageName, pageClassName);
        }

        TreeNode node = e.Node;
        node.DocumentName = newPageName;

        bool updateGuidAfterInsert = false;

        bool wireframe = node.IsWireframe() && PortalHelper.IsWireframingEnabled(SiteContext.CurrentSiteName);
        if (wireframe)
        {
            node.DocumentSearchExcluded = true;

            // Wireframe
            PageTemplateInfo pti = selTemplate.EnsureTemplate(node.DocumentName, node.NodeGUID, ref errorMessage);
            if (pti != null)
            {
                node.NodeWireframeTemplateID = pti.PageTemplateId;
            }
        }
        else
        {
            // Same template for all language versions by default
            PageTemplateInfo pti = selTemplate.EnsureTemplate(node.DocumentName, node.NodeGUID, ref errorMessage);
            if (pti != null)
            {
                node.SetDefaultPageTemplateID(pti.PageTemplateId);

                // Template should by updated after document insert
                if (!pti.IsReusable)
                {
                    updateGuidAfterInsert = true;
                }
            }
        }

        // Insert node if no error
        if (String.IsNullOrEmpty(errorMessage))
        {
            // Switch to design mode (the template is empty at this moment)
            if (!DocumentManager.CreateAnother && (PortalContext.ViewMode != ViewModeEnum.EditLive))
            {
                if (wireframe)
                {
                    // Wireframe mode for wireframes
                    PortalContext.ViewMode = ViewModeEnum.Wireframe;
                }
                else if (selTemplate.NewTemplateIsEmpty)
                {
                    // Design mode for empty template
                    PortalContext.ViewMode = ViewModeEnum.Design;
                }
            }

            // Insert the document
            if (DocumentManager.Mode == FormModeEnum.Convert)
            {
                DocumentManager.UpdateDocument(true);
            }
            else
            {
                // Ensures documents consistency (blog post hierarchy etc.)
                DocumentManager.EnsureDocumentsConsistency();
                DocumentHelper.InsertDocument(node, DocumentManager.ParentNode, DocumentManager.Tree);

                if (updateGuidAfterInsert)
                {
                    PageTemplateInfo pti = PageTemplateInfoProvider.GetPageTemplateInfo(node.NodeTemplateID);
                    if (pti != null)
                    {
                        // Update template's node GUID
                        pti.PageTemplateNodeGUID = node.NodeGUID;
                        PageTemplateInfoProvider.SetPageTemplateInfo(pti);
                    }
                }
            }

            // Create default SKU if configured
            if (ModuleManager.CheckModuleLicense(ModuleName.ECOMMERCE, RequestContext.CurrentDomain, FeatureEnum.Ecommerce, ObjectActionEnum.Insert))
            {
                bool? skuCreated = node.CreateDefaultSKU();
                if (skuCreated.HasValue && !skuCreated.Value)
                {
                    AddError(GetString("com.CreateDefaultSKU.Error"));
                }
            }

            if (node.NodeSKUID > 0)
            {
                DocumentManager.UpdateDocument(true);
            }
        }
        else
        {
            e.IsValid = false;
            e.ErrorMessage = errorMessage;
        }
    }


    protected void DocumentManager_OnValidateData(object sender, DocumentManagerEventArgs e)
    {
        string newPageName = txtPageName.Text.Trim();
        if (String.IsNullOrEmpty(newPageName))
        {
            e.ErrorMessage = GetString("newpage.nameempty");
            e.IsValid = false;
        }
    }

    #endregion
}
