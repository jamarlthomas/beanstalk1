﻿//--------------------------------------------------------------------------------------------------
// <auto-generated>
//
//     This code was generated by code generator tool.
//
//     To customize the code use your own partial class. For more info about how to use and customize
//     the generated code see the documentation at http://docs.kentico.com. 
//
// </auto-generated>
//--------------------------------------------------------------------------------------------------

using System;

using CMS;
using CMS.Helpers;
using CMS.DataEngine;
using CMS.DocumentEngine.Types;
using CMS.DocumentEngine;

[assembly: RegisterDocumentType(ATCToolsPage.CLASS_NAME, typeof(ATCToolsPage))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class ATCToolsPage : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.ATCToolsPage";

        #endregion


        #region "Properties"

        /// <summary>
        /// ATCToolsPageID.
        /// </summary>
        [DatabaseField]
        public int ATCToolsPageID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("ATCToolsPageID"), 0);
            }
            set
            {
                SetValue("ATCToolsPageID", value);
            }
        }


        /// <summary>
        /// Title.
        /// </summary>
        [DatabaseField]
        public string Title
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Title"), "");
            }
            set
            {
                SetValue("Title", value);
            }
        }


        /// <summary>
        /// GATC Title.
        /// </summary>
        [DatabaseField]
        public string GATCTitle
        {
            get
            {
                return ValidationHelper.GetString(GetValue("GATCTitle"), "");
            }
            set
            {
                SetValue("GATCTitle", value);
            }
        }


        /// <summary>
        /// GATC Content.
        /// </summary>
        [DatabaseField]
        public string GATCContent
        {
            get
            {
                return ValidationHelper.GetString(GetValue("GATCContent"), "");
            }
            set
            {
                SetValue("GATCContent", value);
            }
        }


        /// <summary>
        /// GATC Prompt.
        /// </summary>
        [DatabaseField]
        public string GATCPrompt
        {
            get
            {
                return ValidationHelper.GetString(GetValue("GATCPrompt"), "");
            }
            set
            {
                SetValue("GATCPrompt", value);
            }
        }


        /// <summary>
        /// NATC Title.
        /// </summary>
        [DatabaseField]
        public string NATCTitle
        {
            get
            {
                return ValidationHelper.GetString(GetValue("NATCTitle"), "");
            }
            set
            {
                SetValue("NATCTitle", value);
            }
        }


        /// <summary>
        /// NATC Content.
        /// </summary>
        [DatabaseField]
        public string NATCContent
        {
            get
            {
                return ValidationHelper.GetString(GetValue("NATCContent"), "");
            }
            set
            {
                SetValue("NATCContent", value);
            }
        }


        /// <summary>
        /// NATC Prompt.
        /// </summary>
        [DatabaseField]
        public string NATCPrompt
        {
            get
            {
                return ValidationHelper.GetString(GetValue("NATCPrompt"), "");
            }
            set
            {
                SetValue("NATCPrompt", value);
            }
        }


        /// <summary>
        /// Bottom Content (Disclaimer).
        /// </summary>
        [DatabaseField]
        public string BottomContent
        {
            get
            {
                return ValidationHelper.GetString(GetValue("BottomContent"), "");
            }
            set
            {
                SetValue("BottomContent", value);
            }
        }


        /// <summary>
        /// Sidebar Component Items.
        /// </summary>
        [DatabaseField]
        public string SidebarItems
        {
            get
            {
                return ValidationHelper.GetString(GetValue("SidebarItems"), "");
            }
            set
            {
                SetValue("SidebarItems", value);
            }
        }

        #endregion


        #region "Constructors"

        /// <summary>
        /// Constructor.
        /// </summary>
        public ATCToolsPage()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
