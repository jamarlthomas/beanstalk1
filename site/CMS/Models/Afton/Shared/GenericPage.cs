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
using System.Collections.Generic;

using CMS;
using CMS.Helpers;
using CMS.DataEngine;
using CMS.DocumentEngine.Types;
using CMS.DocumentEngine;

[assembly: RegisterDocumentType( GenericPage.CLASS_NAME, typeof( GenericPage ) )]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Represents a content item of type GenericPage.
    /// </summary>
    public partial class GenericPage : TreeNode
    {
        #region "Constants and variables"

        /// <summary>
        /// The name of the data class.
        /// </summary>
        public const string CLASS_NAME = "custom.GenericPage";


        /// <summary>
        /// The instance of the class that provides extended API for working with GenericPage fields.
        /// </summary>
        private readonly GenericPageFields mFields;

        #endregion


        #region "Properties"

        /// <summary>
        /// GenericPageID.
        /// </summary>
        [DatabaseIDField]
        public int GenericPageID
        {
            get
            {
                return ValidationHelper.GetInteger( GetValue( "GenericPageID" ), 0 );
            }
            set
            {
                SetValue( "GenericPageID", value );
            }
        }


        /// <summary>
        /// Tile Title.
        /// </summary>
        [DatabaseField]
        public string TileTitle
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "TileTitle" ), "" );
            }
            set
            {
                SetValue( "TileTitle", value );
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
                return ValidationHelper.GetString( GetValue( "Title" ), "" );
            }
            set
            {
                SetValue( "Title", value );
            }
        }


        /// <summary>
        /// Text that appears on hover over the tile.
        /// </summary>
        [DatabaseField]
        public string Description
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "Description" ), "" );
            }
            set
            {
                SetValue( "Description", value );
            }
        }


        /// <summary>
        /// Image displayed on a tile.
        /// </summary>
        [DatabaseField]
        public string HomeImage
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "HomeImage" ), "" );
            }
            set
            {
                SetValue( "HomeImage", value );
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
                return ValidationHelper.GetString( GetValue( "Copy" ), "" );
            }
            set
            {
                SetValue( "Copy", value );
            }
        }


        /// <summary>
        /// Is this a Campaign Page?.
        /// </summary>
        [DatabaseField]
        public bool Campaign
        {
            get
            {
                return ValidationHelper.GetBoolean( GetValue( "Campaign" ), false );
            }
            set
            {
                SetValue( "Campaign", value );
            }
        }


        /// <summary>
        /// Campaign Subject Name.
        /// </summary>
        [DatabaseField]
        public string SubjectName
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "SubjectName" ), "" );
            }
            set
            {
                SetValue( "SubjectName", value );
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
                return ValidationHelper.GetString( GetValue( "HeroImage" ), "" );
            }
            set
            {
                SetValue( "HeroImage", value );
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
                return ValidationHelper.GetString( GetValue( "SidebarItems" ), "" );
            }
            set
            {
                SetValue( "SidebarItems", value );
            }
        }


        /// <summary>
        /// PdfReference.
        /// </summary>
        [DatabaseField]
        public string PdfReference
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "PdfReference" ), "" );
            }
            set
            {
                SetValue( "PdfReference", value );
            }
        }


        /// <summary>
        /// Is Highlighted On Insights Page.
        /// </summary>
        [DatabaseField]
        public bool IsHighlightedOnInsightsPage
        {
            get
            {
                return ValidationHelper.GetBoolean( GetValue( "IsHighlightedOnInsightsPage" ), false );
            }
            set
            {
                SetValue( "IsHighlightedOnInsightsPage", value );
            }
        }


        /// <summary>
        /// Related Solutions.
        /// </summary>
        [DatabaseField]
        public string RelatedSolution
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "RelatedSolution" ), "" );
            }
            set
            {
                SetValue( "RelatedSolution", value );
            }
        }


        /// <summary>
        /// Gets an object that provides extended API for working with GenericPage fields.
        /// </summary>
        public GenericPageFields Fields
        {
            get
            {
                return mFields;
            }
        }


        /// <summary>
        /// Provides extended API for working with GenericPage fields.
        /// </summary>
        public partial class GenericPageFields
        {
            /// <summary>
            /// The content item of type GenericPage that is a target of the extended API.
            /// </summary>
            private readonly GenericPage mInstance;


            /// <summary>
            /// Initializes a new instance of the <see cref="GenericPageFields" /> class with the specified content item of type GenericPage.
            /// </summary>
            /// <param name="instance">The content item of type GenericPage that is a target of the extended API.</param>
            public GenericPageFields( GenericPage instance )
            {
                mInstance = instance;
            }


            /// <summary>
            /// GenericPageID.
            /// </summary>
            public int ID
            {
                get
                {
                    return mInstance.GenericPageID;
                }
                set
                {
                    mInstance.GenericPageID = value;
                }
            }


            /// <summary>
            /// Tile Title.
            /// </summary>
            public string TileTitle
            {
                get
                {
                    return mInstance.TileTitle;
                }
                set
                {
                    mInstance.TileTitle = value;
                }
            }


            /// <summary>
            /// Title.
            /// </summary>
            public string Title
            {
                get
                {
                    return mInstance.Title;
                }
                set
                {
                    mInstance.Title = value;
                }
            }


            /// <summary>
            /// Text that appears on hover over the tile.
            /// </summary>
            public string Description
            {
                get
                {
                    return mInstance.Description;
                }
                set
                {
                    mInstance.Description = value;
                }
            }


            /// <summary>
            /// Image displayed on a tile.
            /// </summary>
            public string HomeImage
            {
                get
                {
                    return mInstance.HomeImage;
                }
                set
                {
                    mInstance.HomeImage = value;
                }
            }


            /// <summary>
            /// Copy.
            /// </summary>
            public string Copy
            {
                get
                {
                    return mInstance.Copy;
                }
                set
                {
                    mInstance.Copy = value;
                }
            }


            /// <summary>
            /// Is this a Campaign Page?.
            /// </summary>
            public bool Campaign
            {
                get
                {
                    return mInstance.Campaign;
                }
                set
                {
                    mInstance.Campaign = value;
                }
            }


            /// <summary>
            /// Campaign Subject Name.
            /// </summary>
            public string SubjectName
            {
                get
                {
                    return mInstance.SubjectName;
                }
                set
                {
                    mInstance.SubjectName = value;
                }
            }


            /// <summary>
            /// Hero Image.
            /// </summary>
            public string HeroImage
            {
                get
                {
                    return mInstance.HeroImage;
                }
                set
                {
                    mInstance.HeroImage = value;
                }
            }


            /// <summary>
            /// Sidebar Items.
            /// </summary>
            public string SidebarItems
            {
                get
                {
                    return mInstance.SidebarItems;
                }
                set
                {
                    mInstance.SidebarItems = value;
                }
            }


            /// <summary>
            /// SidebarItems.
            /// </summary>
            public IEnumerable<TreeNode> SidebarItems2
            {
                get
                {
                    return mInstance.GetRelatedDocuments( "SidebarItems2" );
                }
            }


            /// <summary>
            /// PdfReference.
            /// </summary>
            public string PdfReference
            {
                get
                {
                    return mInstance.PdfReference;
                }
                set
                {
                    mInstance.PdfReference = value;
                }
            }


            /// <summary>
            /// Is Highlighted On Insights Page.
            /// </summary>
            public bool IsHighlightedOnInsightsPage
            {
                get
                {
                    return mInstance.IsHighlightedOnInsightsPage;
                }
                set
                {
                    mInstance.IsHighlightedOnInsightsPage = value;
                }
            }


            /// <summary>
            /// Related Solutions.
            /// </summary>
            public string RelatedSolution
            {
                get
                {
                    return mInstance.RelatedSolution;
                }
                set
                {
                    mInstance.RelatedSolution = value;
                }
            }
        }

        #endregion


        #region "Constructors"

        /// <summary>
        /// Initializes a new instance of the <see cref="GenericPage" /> class.
        /// </summary>
        public GenericPage()
            : base( CLASS_NAME )
        {
            mFields = new GenericPageFields( this );
        }

        #endregion
    }
}