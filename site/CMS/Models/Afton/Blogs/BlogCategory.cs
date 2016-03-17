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

[assembly: RegisterDocumentType(BlogCategory.CLASS_NAME, typeof(BlogCategory))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class BlogCategory : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.BlogCategory";

        #endregion


        #region "Properties"

        /// <summary>
        /// BlogCategoryID.
        /// </summary>
        [DatabaseField]
        public int BlogCategoryID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("BlogCategoryID"), 0);
            }
            set
            {
                SetValue("BlogCategoryID", value);
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

        #endregion


        #region "Constructors"

        /// <summary>
        /// Constructor.
        /// </summary>
        public BlogCategory()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
