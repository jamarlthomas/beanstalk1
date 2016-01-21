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

[assembly: RegisterDocumentType(GenericSidebarComponentWithDefaultImage.CLASS_NAME, typeof(GenericSidebarComponentWithDefaultImage))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class GenericSidebarComponentWithDefaultImage : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.GenericSidebarComponentWithDefaultImage";

        #endregion


        #region "Properties"

        /// <summary>
        /// GenericSidebarComponentWithDefaultImageID.
        /// </summary>
        [DatabaseField]
        public int GenericSidebarComponentWithDefaultImageID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("GenericSidebarComponentWithDefaultImageID"), 0);
            }
            set
            {
                SetValue("GenericSidebarComponentWithDefaultImageID", value);
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
        /// Default Image.
        /// </summary>
        [DatabaseField]
        public string DefaultImage
        {
            get
            {
                return ValidationHelper.GetString(GetValue("DefaultImage"), "");
            }
            set
            {
                SetValue("DefaultImage", value);
            }
        }

        #endregion


        #region "Constructors"

        /// <summary>
        /// Constructor.
        /// </summary>
        public GenericSidebarComponentWithDefaultImage()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
