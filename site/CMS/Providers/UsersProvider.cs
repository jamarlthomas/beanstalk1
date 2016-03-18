using CMS.Membership;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class UsersProvider : IUsersProvider
    {
        public List<UserInfo> GetUsers()
        {
            return ContentHelper.GetUsers();
        }
    }
}