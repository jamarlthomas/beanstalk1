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

[assembly: RegisterDocumentType( FAQPage.CLASS_NAME, typeof( FAQPage ) )]

namespace CMS.DocumentEngine.Types
{
    /// <summary>
    /// Represents a content item of type FAQPage.
    /// </summary>
    public partial class FAQPage : TreeNode
    {
        #region "Constants and variables"

        /// <summary>
        /// The name of the data class.
        /// </summary>
        public const string CLASS_NAME = "custom.FAQPage";


        /// <summary>
        /// The instance of the class that provides extended API for working with FAQPage fields.
        /// </summary>
        private readonly FAQPageFields mFields;

        #endregion


        #region "Properties"

        /// <summary>
        /// FAQPageID.
        /// </summary>
        [DatabaseIDField]
        public int FAQPageID
        {
            get
            {
                return ValidationHelper.GetInteger( GetValue( "FAQPageID" ), 0 );
            }
            set
            {
                SetValue( "FAQPageID", value );
            }
        }


        /// <summary>
        /// 
        /// </summary>
        [DatabaseField]
        public string HomeTitle
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "HomeTitle" ), "" );
            }
            set
            {
                SetValue( "HomeTitle", value );
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
        /// Sort By Label.
        /// </summary>
        [DatabaseField]
        public string SortByLabel
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "SortByLabel" ), "" );
            }
            set
            {
                SetValue( "SortByLabel", value );
            }
        }


        /// <summary>
        /// View All FAQs Label.
        /// </summary>
        [DatabaseField]
        public string ViewAllLabel
        {
            get
            {
                return ValidationHelper.GetString( GetValue( "ViewAllLabel" ), "" );
            }
            set
            {
                SetValue( "ViewAllLabel", value );
            }
        }


        /// <summary>
        /// Gets an object that provides extended API for working with FAQPage fields.
        /// </summary>
        public FAQPageFields Fields
        {
            get
            {
                return mFields;
            }
        }


        /// <summary>
        /// Provides extended API for working with FAQPage fields.
        /// </summary>
        public partial class FAQPageFields
        {
            /// <summary>
            /// The content item of type FAQPage that is a target of the extended API.
            /// </summary>
            private readonly FAQPage mInstance;


            /// <summary>
            /// Initializes a new instance of the <see cref="FAQPageFields" /> class with the specified content item of type FAQPage.
            /// </summary>
            /// <param name="instance">The content item of type FAQPage that is a target of the extended API.</param>
            public FAQPageFields( FAQPage instance )
            {
                mInstance = instance;
            }


            /// <summary>
            /// FAQPageID.
            /// </summary>
            public int ID
            {
                get
                {
                    return mInstance.FAQPageID;
                }
                set
                {
                    mInstance.FAQPageID = value;
                }
            }


            /// <summary>
            /// 
            /// </summary>
            public string HomeTitle
            {
                get
                {
                    return mInstance.HomeTitle;
                }
                set
                {
                    mInstance.HomeTitle = value;
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
            /// Sort By Label.
            /// </summary>
            public string SortByLabel
            {
                get
                {
                    return mInstance.SortByLabel;
                }
                set
                {
                    mInstance.SortByLabel = value;
                }
            }


            /// <summary>
            /// View All FAQs Label.
            /// </summary>
            public string ViewAllLabel
            {
                get
                {
                    return mInstance.ViewAllLabel;
                }
                set
                {
                    mInstance.ViewAllLabel = value;
                }
            }


            /// <summary>
            /// Sidebar Items.
            /// </summary>
            public IEnumerable<TreeNode> SidebarItems
            {
                get
                {
                    return mInstance.GetRelatedDocuments( "SidebarItems" );
                }
            }
        }

        #endregion


        #region "Constructors"

        /// <summary>
        /// Initializes a new instance of the <see cref="FAQPage" /> class.
        /// </summary>
        public FAQPage()
            : base( CLASS_NAME )
        {
            mFields = new FAQPageFields( this );
        }

        #endregion
    }
}