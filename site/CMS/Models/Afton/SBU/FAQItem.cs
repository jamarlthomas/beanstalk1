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

[assembly: RegisterDocumentType(FAQItem.CLASS_NAME, typeof(FAQItem))]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Sample item class.
    /// </summary>
    public partial class FAQItem : TreeNode
    {
        #region "Constants"

        /// <summary>
        /// Class name of the item.
        /// </summary>
        public const string CLASS_NAME = "custom.FAQItem";

        #endregion


        #region "Properties"

        /// <summary>
        /// FAQItemID.
        /// </summary>
        [DatabaseField]
        public int FAQItemID
        {
            get
            {
                return ValidationHelper.GetInteger(GetValue("FAQItemID"), 0);
            }
            set
            {
                SetValue("FAQItemID", value);
            }
        }


        /// <summary>
        /// Question.
        /// </summary>
        [DatabaseField]
        public string Question
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Question"), "");
            }
            set
            {
                SetValue("Question", value);
            }
        }


        /// <summary>
        /// Answer.
        /// </summary>
        [DatabaseField]
        public string Answer
        {
            get
            {
                return ValidationHelper.GetString(GetValue("Answer"), "");
            }
            set
            {
                SetValue("Answer", value);
            }
        }


        /// <summary>
        /// RelatedSBU.
        /// </summary>
        [DatabaseField]
        public string RelatedSBU
        {
            get
            {
                return ValidationHelper.GetString(GetValue("RelatedSBU"), "");
            }
            set
            {
                SetValue("RelatedSBU", value);
            }
        }


        /// <summary>
        /// FAQTopic.
        /// </summary>
        [DatabaseField]
        public string FAQTopic
        {
            get
            {
                return ValidationHelper.GetString(GetValue("FAQTopic"), "");
            }
            set
            {
                SetValue("FAQTopic", value);
            }
        }

        #endregion


        #region "Constructors"

        /// <summary>
        /// Constructor.
        /// </summary>
        public FAQItem()
            : base(CLASS_NAME)
        {
        }

        #endregion
    }
}
