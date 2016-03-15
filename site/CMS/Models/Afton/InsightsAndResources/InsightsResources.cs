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

[assembly: RegisterDocumentType(InsightsResources.CLASS_NAME, typeof(InsightsResources))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class InsightsResources : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.InsightsResources";

        #endregion


        #region "Properties"

        /// <summary>
        /// InsightsResourcesID.
        /// </summary>
        [DatabaseField]
        public int InsightsResourcesID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("InsightsResourcesID"), 0);
            }
            set
            {
                SetValue("InsightsResourcesID", value);
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
        /// Hero Image.
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
        /// Headline.
        /// </summary>
        [DatabaseField]
        public string Headline
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Headline"), "");
            }
            set
            {
                SetValue("Headline", value);
            }
        }


        /// <summary>
        /// Subheadline.
        /// </summary>
        [DatabaseField]
        public string Subheadline
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Subheadline"), "");
            }
            set
            {
                SetValue("Subheadline", value);
            }
        }


        /// <summary>
        /// View All Label.
        /// </summary>
        [DatabaseField]
        public string ViewAllLabel
        {
            get
            {
                return ValidationHelper.GetString(GetValue("ViewAllLabel"), "");
            }
            set
            {
                SetValue("ViewAllLabel", value);
            }
        }


        /// <summary>
        /// Product Data Sheets Title.
        /// </summary>
        [DatabaseField]
        public string ProductDataSheetsTitle
        {
            get
            {
                return ValidationHelper.GetString(GetValue("ProductDataSheetsTitle"), "");
            }
            set
            {
                SetValue("ProductDataSheetsTitle", value);
            }
        }


        /// <summary>
        /// Stay Informed Tile Title.
        /// </summary>
        [DatabaseField]
        public string StayInformedTileTitle
        {
            get
            {
                return ValidationHelper.GetString(GetValue("StayInformedTileTitle"), "");
            }
            set
            {
                SetValue("StayInformedTileTitle", value);
            }
        }


        /// <summary>
        /// Stay Informed Tile Description.
        /// </summary>
        [DatabaseField]
        public string StayInformedTileDescription
        {
            get
            {
                return ValidationHelper.GetString(GetValue("StayInformedTileDescription"), "");
            }
            set
            {
                SetValue("StayInformedTileDescription", value);
            }
        }


        /// <summary>
        /// Featured Content List.
        /// </summary>
        [DatabaseField]
        public string FeaturedContentList
        {
            get
            {
                return ValidationHelper.GetString(GetValue("FeaturedContentList"), "");
            }
            set
            {
                SetValue("FeaturedContentList", value);
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
        public InsightsResources()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
