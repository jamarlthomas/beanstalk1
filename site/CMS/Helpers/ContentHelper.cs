using System.Linq.Expressions;
using System.Threading;
using System.Web.Configuration;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Helpers;
using CMS.Localization;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using CMS.PortalEngine;
using System;
using System.Collections.Generic;
using System.Linq;
using WebGrease;

namespace CMS.Mvc.Helpers
{
    public class ContentHelper
    {
        private static readonly int CachingTime =
            string.IsNullOrWhiteSpace(WebConfigurationManager.AppSettings.Get("CacheContentMinutes"))
                ? 20
                : int.Parse(WebConfigurationManager.AppSettings.Get("CacheContentMinutes"));

        private static readonly string CurrentCulture = LocalizationContext.CurrentCulture.CultureCode;

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
                a => a.NodeAlias.Equals(docName, StringComparison.InvariantCultureIgnoreCase),
                className,
                string.Format("cc_{0}_cn_{1}_dn_{2}", CurrentCulture, className, docName),
                null,
                "nodeid|{0}"
                );
        }
        public static List<BreadCrumbLinkItemViewModel> GetBreadcrumb<T>(string className, string name) where T : TreeNode, new()
        {
            var doc = GetDocByName<T>(className, name);
            var list = new List<Link>();
            TraverseNodes(doc, list);

            list.Add(new Link() { Title = "Home", Reference = "" });
            list.Reverse();
            string currReference = "";
            var breadcrumbList = list.Select(item =>
            {
                if (!string.IsNullOrWhiteSpace(item.Reference))
                    currReference += "/" + item.Reference;
                return new BreadCrumbLinkItemViewModel()
                {
                    Title = item.Title,
                    Reference = currReference
                };
            }).ToList();
            return breadcrumbList;
        }

        private static void TraverseNodes(TreeNode doc, List<Link> list)
        {
            object val;
            if (!doc.TryGetProperty("ExcludeFromSiteMap", out val))
                list.Add(new Link() {Title = doc.DocumentName, Reference = doc.NodeAlias});
            
            if (doc.Parent.NodeAliasPath == "/")
                return;
            TraverseNodes(doc.Parent, list);
        }


        public static List<T> GetDocs<T>(string className) where T : TreeNode, new()
        {
            return HandleQueryableData<T>(
                q => q, //no constraints
                className,
                string.Format("cc_{0}_cn_{1}", CurrentCulture, className),
                string.Format("nodes|afton|{0}|all", className.ToLower())).ToList();
        }


        public static List<T> GetDocChildrenByName<T>(string childrenClassName, string docName)
            where T : TreeNode, new()
        {
            docName = docName.Replace(' ', '-');
            return HandleQueryableData<T>(
                q => q.Where(item => item.Parent.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase)),
                childrenClassName,
                string.Format("cc_{0}_ccn_{1}_dn_{2}", CurrentCulture, childrenClassName, docName),
                string.Format("nodes|afton|{0}|all", childrenClassName.ToLower())
                ).ToList();
        }

        private static T HandleData<T>(Expression<Func<TreeNode, bool>> predicate, string className, string cacheKey,
            string cacheDependencyKey, string cachedependenciesFormat = "") where T : TreeNode, new()
        {

            switch (PortalContext.ViewMode)
            {
                case ViewModeEnum.Preview:
                    {
                        var doc = DocumentHelper.GetDocuments(className).Published(false)
                            .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                            .FirstOrDefault(predicate);
                        return (T)doc;
                    }
                case ViewModeEnum.LiveSite:
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
                default:
                    {
                        var doc = DocumentHelper.GetDocuments(className)
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
            switch (PortalContext.ViewMode)
            {
                case ViewModeEnum.Preview:
                    {
                        var treeNodes = DocumentHelper.GetDocuments(className)
                            .Published(false)
                            .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                        return constraint(treeNodes).Select(it => (TResult)it);
                    }
                case ViewModeEnum.LiveSite:
                    {
                        if (!string.IsNullOrWhiteSpace(cacheKey))
                        {
                            return CacheHelper.Cache(cs =>
                            {
                                var tree = new TreeProvider();
                                var treeNodes = tree.SelectNodes(className)
                                    .Published()
                                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                                if (!string.IsNullOrWhiteSpace(cacheDependencyKey))
                                    cs.CacheDependency = CacheHelper.GetCacheDependency(cacheDependencyKey);
                                return constraint(treeNodes).Select(item => (TResult)item).Where(i => i != null);
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
                default:
                    {
                        return constraint(DocumentHelper.GetDocuments(className)
                            .OrderBy("NodeLevel", "NodeOrder", "NodeName")).Select(it => (TResult)it);
                    }
            }
        }


    }
}