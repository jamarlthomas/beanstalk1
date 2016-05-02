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

[assembly: RegisterDocumentType(Solution.CLASS_NAME, typeof(Solution))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class Solution : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.Solution";

        #endregion


        #region "Properties"

        /// <summary>
        /// SolutionID.
        /// </summary>
        [DatabaseField]
        public int SolutionID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("SolutionID"), 0);
            }
            set
            {
                SetValue("SolutionID", value);
            }
        }


        /// <summary>
        /// 
        /// </summary>
        [DatabaseField]
        public string HomeImage
        {
            get
            {
                return ValidationHelper.GetString(GetValue("HomeImage"), "");
            }
            set
            {
                SetValue("HomeImage", value);
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
        /// Subtitle.
        /// </summary>
        [DatabaseField]
        public string Subtitle
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Subtitle"), "");
            }
            set
            {
                SetValue("Subtitle", value);
            }
        }

        /// <summary>
        /// Copy.
        /// </summary>
        [DatabaseField]
        public string Copy
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Copy"), "");
            }
            set
            {
                SetValue("Copy", value);
            }
        }

        /// <summary>
        /// HeroImage.
        /// </summary>
        [DatabaseField]
        public string HeroImage
        {
            get
            {
                return ValidationHelper.GetString(GetValue("HeroImage"), "");
            }
            set
            {
                SetValue("HeroImage", value);
            }
        }


        /// <summary>
        /// NavigationIcon.
        /// </summary>
        [DatabaseField]
        public string NavigationIcon
        {
            get
            {
                return ValidationHelper.GetString(GetValue("NavigationIcon"), "");
            }
            set
            {
                SetValue("NavigationIcon", value);
            }
        }


        /// <summary>
        /// Description.
        /// </summary>
        [DatabaseField]
        public string Description
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Description"), "");
            }
            set
            {
                SetValue("Description", value);
            }
        }


        /// <summary>
        /// FeaturedProductList.
        /// </summary>
        [DatabaseField]
        public string FeaturedProductList
        {
            get
            {
                return ValidationHelper.GetString(GetValue("FeaturedProductList"), "");
            }
            set
            {
                SetValue("FeaturedProductList", value);
            }
        }


        /// <summary>
        /// Sidebar Items.
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
        public Solution()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
