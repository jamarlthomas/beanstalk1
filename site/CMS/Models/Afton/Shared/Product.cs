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

[assembly: RegisterDocumentType(Product.CLASS_NAME, typeof(Product))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class Product : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.Product";

        #endregion


        #region "Properties"

        /// <summary>
        /// ProductID.
        /// </summary>
        [DatabaseField]
        public int ProductID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("ProductID"), 0);
            }
            set
            {
                SetValue("ProductID", value);
            }
        }


        /// <summary>
        /// 
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
        /// TileImage.
        /// </summary>
        [DatabaseField]
        public string TileImage
        {
            get
            {
                return ValidationHelper.GetString(GetValue("TileImage"), "");
            }
            set
            {
                SetValue("TileImage", value);
            }
        }


        /// <summary>
        /// Content.
        /// </summary>
        [DatabaseField]
        public string Content
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Content"), "");
            }
            set
            {
                SetValue("Content", value);
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
        /// Region.
        /// </summary>
        [DatabaseField]
        public string Region
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Region"), "");
            }
            set
            {
                SetValue("Region", value);
            }
        }


        /// <summary>
        /// Benefits.
        /// </summary>
        [DatabaseField]
        public string Benefits
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Benefits"), "");
            }
            set
            {
                SetValue("Benefits", value);
            }
        }


        /// <summary>
        /// Dosage.
        /// </summary>
        [DatabaseField]
        public string Dosage
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Dosage"), "");
            }
            set
            {
                SetValue("Dosage", value);
            }
        }


        /// <summary>
        /// Characteristics.
        /// </summary>
        [DatabaseField]
        public string Characteristics
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Characteristics"), "");
            }
            set
            {
                SetValue("Characteristics", value);
            }
        }


        /// <summary>
        /// Approvals.
        /// </summary>
        [DatabaseField]
        public string Approvals
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Approvals"), "");
            }
            set
            {
                SetValue("Approvals", value);
            }
        }


        /// <summary>
        /// Handling Information.
        /// </summary>
        [DatabaseField]
        public string HandlingInformation
        {
            get
            {
                return ValidationHelper.GetString(GetValue("HandlingInformation"), "");
            }
            set
            {
                SetValue("HandlingInformation", value);
            }
        }


        /// <summary>
        /// Comparison.
        /// </summary>
        [DatabaseField]
        public string Comparison
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Comparison"), "");
            }
            set
            {
                SetValue("Comparison", value);
            }
        }

        #endregion


        #region "Constructors"

        /// <summary>
        /// Constructor.
        /// </summary>
        public Product()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
