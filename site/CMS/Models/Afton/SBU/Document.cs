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

[assembly: RegisterDocumentType(Document.CLASS_NAME, typeof(Document))]

namespace CMS.DocumentEngine.Types
{
	/// <summary>
	/// Sample item class.
	/// </summary>
	public partial class Document : TreeNode
	{
		#region "Constants"

		/// <summary>
		/// Class name of the item.
		/// </summary>
		public const string CLASS_NAME = "custom.Document";

		#endregion


		#region "Properties"

		/// <summary>
		/// CustomDocumentID.
		/// </summary>
		[DatabaseField]
		public int CustomDocumentID
		{
			get
			{
				return ValidationHelper.GetInteger(GetValue("CustomDocumentID"), 0);
			}
			set
			{
				SetValue("CustomDocumentID", value);
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
		/// 
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
		/// Abstract.
		/// </summary>
		[DatabaseField]
		public string Abstract
		{
			get
			{
				return ValidationHelper.GetString(GetValue("Abstract"), "");
			}
			set
			{
				SetValue("Abstract", value);
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
		/// IsHighlightedOnInsightsPage.
		/// </summary>
		[DatabaseField]
		public bool IsHighlightedOnInsightsPage
		{
			get
			{
				return ValidationHelper.GetBoolean(GetValue("IsHighlightedOnInsightsPage"), false);
			}
			set
			{
				SetValue("IsHighlightedOnInsightsPage", value);
			}
		}

		#endregion


		#region "Constructors"

		/// <summary>
		/// Constructor.
		/// </summary>
		public Document()
			: base(CLASS_NAME)
		{
		}

		#endregion
	}
}
