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

[assembly: RegisterDocumentType(PagesMenuItem.CLASS_NAME, typeof(PagesMenuItem))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class PagesMenuItem : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.PagesMenuItem";

        #endregion


        #region "Properties"

        /// <summary>
        /// PagesMenuItemID.
        /// </summary>
        [DatabaseField]
        public int PagesMenuItemID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("PagesMenuItemID"), 0);
            }
            set
            {
                SetValue("PagesMenuItemID", value);
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
        /// 
        /// </summary>
        [DatabaseField]
        public string Reference
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Reference"), "");
            }
            set
            {
                SetValue("Reference", value);
            }
        }

        #endregion


        #region "Constructors"

        /// <summary>
        /// Constructor.
        /// </summary>
        public PagesMenuItem()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
