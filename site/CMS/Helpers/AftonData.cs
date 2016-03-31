using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.DocumentEngine.Types;

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

        public static List<string> PersonalizationTypes
        {
            get
            {
                return new List<string>()
                {
                    Product.CLASS_NAME,
                    SolutionBusinessUnit.CLASS_NAME,
                    Solution.CLASS_NAME,
                    Document.CLASS_NAME,
                    GenericPage.CLASS_NAME,
                    CustomNews.CLASS_NAME,
                    Event.CLASS_NAME,
                    NewsAndEventsPage.CLASS_NAME
                };
            }
            
        }
    }
}