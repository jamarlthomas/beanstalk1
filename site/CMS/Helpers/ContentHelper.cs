using System.Linq.Expressions;
using System.Web.Configuration;
using CMS.DocumentEngine;
using CMS.Helpers;
using CMS.PortalEngine;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Helpers
{
    public class ContentHelper
    {
        private static readonly int CachingTime = string.IsNullOrWhiteSpace(WebConfigurationManager.AppSettings.Get("CacheContentMinutes")) ? 20 : int.Parse(WebConfigurationManager.AppSettings.Get("CacheContentMinutes"));
       
        public static List<TreeNode> GetAllNodes()
        {
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var docs = DocumentHelper.GetDocuments().AllCultures();
                return docs.ToList();
            }
            else
            {
                var tree = new TreeProvider();
                var docs = tree.SelectNodes().Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                return docs.ToList();

            }
        }

        public static T GetDocByName<T>(string className, string docName) where T : TreeNode, new()
        {
            docName = docName.Replace(' ', '-');
            return HandleData<T>(
                a=> a.NodeAlias.Equals(docName, StringComparison.InvariantCultureIgnoreCase),
                className,
                string.Format("cn_{0}_dn_{1}", className, docName),
                null,
                "nodeid|{0}"
                );
        }

       

        public static List<T> GetDocs<T>(string className) where T : TreeNode, new()
        {
            return HandleQueryableData<T>(
                q => q, //no constraints
                className,
                string.Format("cn_{0}", className),
                string.Format("nodes|afton|{0}|all", className.ToLower())).ToList();
        }


        public static List<T> GetDocChildrenByName<T>(string childrenClassName, string docName) where T : TreeNode, new()
        {
            docName = docName.Replace(' ', '-');
            return HandleQueryableData<T>(
                q => q.Where(item => item.Parent.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase)),
                childrenClassName,
                string.Format("ccn_{0}_dn_{1}", childrenClassName, docName),
                string.Format("nodes|afton|{0}|all", childrenClassName.ToLower())
                ).ToList();
        }

        private static T HandleData<T>(Expression<Func<TreeNode, bool>> predicate, string className, string cacheKey, string cacheDependencyKey, string cachedependenciesFormat = "") where T : TreeNode, new()
        {
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var doc = DocumentHelper.GetDocuments(className).Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                    .FirstOrDefault(predicate);
                return (T)doc;
            }
            else
            {
                if (!string.IsNullOrWhiteSpace(cacheKey))
                {
                    return CacheHelper.Cache(cs =>
                    {
                        TreeProvider tree = new TreeProvider();
                        var doc = tree.SelectNodes(className).Published()
                            .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                            .FirstOrDefault(predicate);
                        if (string.IsNullOrWhiteSpace(cacheDependencyKey))
                            if (doc != null)
                                cacheDependencyKey = string.Format(cachedependenciesFormat, doc.NodeID);
                        if (!string.IsNullOrWhiteSpace(cacheDependencyKey))
                            cs.CacheDependency = CacheHelper.GetCacheDependency(cacheDependencyKey);
                        return (T)doc;
                    },
                        new CacheSettings(CachingTime, cacheKey));
                }
                else
                {
                    TreeProvider tree = new TreeProvider();
                    var doc = tree.SelectNodes(className).Published()
                        .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                        .FirstOrDefault(predicate);
                    return (T)doc;
                }

            }
        }

        private static IQueryable<TResult> HandleQueryableData<TResult>(
            Func<DocumentQuery, IQueryable<TreeNode>> constraint, string className, string cacheKey = "",
            string cacheDependencyKey = "") where TResult : TreeNode, new()
        {
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var treeNodes = DocumentHelper.GetDocuments(className).Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                return constraint(treeNodes).Select(it => (TResult) it);

            }
            else
            {
                if (!string.IsNullOrWhiteSpace(cacheKey))
                {
                    return CacheHelper.Cache(cs =>
                    {
                        var tree = new TreeProvider();
                        var baseNodes = tree.SelectNodes(className);
                        var treeNodes = baseNodes.Published()
                            .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                        if (!string.IsNullOrWhiteSpace(cacheDependencyKey))
                            cs.CacheDependency = CacheHelper.GetCacheDependency(cacheDependencyKey);
                        return constraint(treeNodes).Select(item => (TResult) item).Where(i => i != null);
                    }, new CacheSettings(CachingTime, cacheKey));
                }
                else
                {
                    var tree = new TreeProvider();
                    var baseNodes = tree.SelectNodes(className);
                    var treeNodes = baseNodes.Published()
                        .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                    return constraint(treeNodes).Select(item => (TResult)item).Where(i => i != null);
                }

            }
        }

        
    }
}