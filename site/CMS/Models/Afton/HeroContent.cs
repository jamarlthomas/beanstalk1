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

[assembly: RegisterDocumentType(HeroContent.CLASS_NAME, typeof(HeroContent))]

namespace CMS.DocumentEngine.Types
{
	/// <summary>
	/// Sample item class.
	/// </summary>
	public partial class HeroContent : TreeNode
	{
		#region "Constants"

		/// <summary>
		/// Class name of the item.
		/// </summary>
		public const string CLASS_NAME = "custom.HeroContent";

		#endregion


		#region "Properties"

		/// <summary>
		/// HeroContentID.
		/// </summary>
		[DatabaseField]
		public int HeroContentID
		{
			get
			{
				return ValidationHelper.GetInteger(GetValue("HeroContentID"), 0);
			}
			set
			{
				SetValue("HeroContentID", value);
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
		/// 
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
		/// Image.
		/// </summary>
		[DatabaseField]
		public string Image
		{
			get
			{
				return ValidationHelper.GetString(GetValue("Image"), "");
			}
			set
			{
				SetValue("Image", value);
			}
		}


		/// <summary>
		/// RelatedDocument.
		/// </summary>
		[DatabaseField]
		public string RelatedDocument
		{
			get
			{
				return ValidationHelper.GetString(GetValue("RelatedDocument"), "");
			}
			set
			{
				SetValue("RelatedDocument", value);
			}
		}

		#endregion


		#region "Constructors"

		/// <summary>
		/// Constructor.
		/// </summary>
		public HeroContent()
			: base(CLASS_NAME)
		{
		}

		#endregion
	}
}
