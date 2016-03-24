using CMS.Membership;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IUsersProvider
    {
        List<UserInfo> GetUsers();
    }
}
