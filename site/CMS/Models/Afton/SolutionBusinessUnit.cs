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

[assembly: RegisterDocumentType(SolutionBusinessUnit.CLASS_NAME, typeof(SolutionBusinessUnit))]

namespace CMS.DocumentEngine.Types
{
	/// <summary>
	/// Sample item class.
	/// </summary>
	public partial class SolutionBusinessUnit : TreeNode
	{
		#region "Constants"

		/// <summary>
		/// Class name of the item.
		/// </summary>
		public const string CLASS_NAME = "custom.SolutionBusinessUnit";

		#endregion


		#region "Properties"

		/// <summary>
		/// SolutionBusinessUnitID.
		/// </summary>
		[DatabaseField]
		public int SolutionBusinessUnitID
		{
			get
			{
				return ValidationHelper.GetInteger(GetValue("SolutionBusinessUnitID"), 0);
			}
			set
			{
				SetValue("SolutionBusinessUnitID", value);
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
		/// DocumentsDescription.
		/// </summary>
		[DatabaseField]
		public string DocumentsDescription
		{
			get
			{
				return ValidationHelper.GetString(GetValue("DocumentsDescription"), "");
			}
			set
			{
				SetValue("DocumentsDescription", value);
			}
		}


		/// <summary>
		/// FAQDescription.
		/// </summary>
		[DatabaseField]
		public string FAQDescription
		{
			get
			{
				return ValidationHelper.GetString(GetValue("FAQDescription"), "");
			}
			set
			{
				SetValue("FAQDescription", value);
			}
		}


		/// <summary>
		/// FAQList.
		/// </summary>
		[DatabaseField]
		public string FAQList
		{
			get
			{
				return ValidationHelper.GetString(GetValue("FAQList"), "");
			}
			set
			{
				SetValue("FAQList", value);
			}
		}


		/// <summary>
		/// Theme.
		/// </summary>
		[DatabaseField]
		public string Theme
		{
			get
			{
				return ValidationHelper.GetString(GetValue("Theme"), "");
			}
			set
			{
				SetValue("Theme", value);
			}
		}

		#endregion


		#region "Constructors"

		/// <summary>
		/// Constructor.
		/// </summary>
		public SolutionBusinessUnit()
			: base(CLASS_NAME)
		{
		}

		#endregion
	}
}
