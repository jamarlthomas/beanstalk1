using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class SolutionConstantsProvider : ISolutionConstantsProvider
    {
        public SolutionConstants GetSolutionConstants()
        {
            return ContentHelper.GetDocs<SolutionConstants>(SolutionConstants.CLASS_NAME).FirstOrDefault();
        }
    }
}