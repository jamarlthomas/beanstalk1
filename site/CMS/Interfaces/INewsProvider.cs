using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface INewsProvider
    {
        CustomNews GetNewsItem(string alias);
    }
}