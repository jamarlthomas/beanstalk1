using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Helpers
{
    public class AftonData
    {
        public class MediaLibraries
        {
            public class PdfLibrary
            {
                public static int LibrarryId
                {
                    get { return 3; }
                }
                public static Guid LibraryGuid { get { return new Guid("2c296394-8847-453d-b351-ef424e499581"); } }
                public static string FolderName { get { return @"Product\"; } }
                public static string LibraryPath { get { return @"Afton\media\PdfFiles\"; } }
            }
        }
    }
}