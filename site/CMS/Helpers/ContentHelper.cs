﻿using System.Web;
using CMS.Base;
using CMS.Globalization;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Helpers;
using CMS.Localization;
using CMS.Membership;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.ViewModels.Shared;
using CMS.PortalEngine;
using CMS.Search;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Configuration;

namespace CMS.Mvc.Helpers
{
    public class ContentHelper
    {
        private static readonly int CachingTime =
            string.IsNullOrWhiteSpace(WebConfigurationManager.AppSettings.Get("CacheContentMinutes"))
                ? 20
                : int.Parse(WebConfigurationManager.AppSettings.Get("CacheContentMinutes"));

        private static readonly string CurrentCulture = LocalizationContext.CurrentCulture.CultureCode;
        private static HttpContext context = HttpContext.Current;
        private static readonly TreeProvider _treeProvider = new TreeProvider();
        private static string _allContentKey = "";
        public const string NodeIdKey = "PageViewNodeId";
        public const string NodeAliasPathKey = "PageViewDocumentPath";
        public const string ObjectNameKey = "ObjectName";

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

        public static List<BreadCrumbLinkItemViewModel> GetBreadcrumb<T>(Guid guid) where T : TreeNode
        {
            return GetBreadcrumb(GetDocByGuid<T>(guid));
        }

        public static List<BreadCrumbLinkItemViewModel> GetBreadcrumb<T>(string className, string name) where T : TreeNode, new()
        {
            return GetBreadcrumb(GetDocByName<T>(className, name));
        }

        private static List<BreadCrumbLinkItemViewModel> GetBreadcrumb<T>(T doc) where T : TreeNode
        {
            var breadcrumbList = new List<BreadCrumbLinkItemViewModel>();
            object val;
            TreeNode node = doc;
            while (node.NodeAliasPath != "/")
            {
                if (!node.TryGetProperty("ExcludeFromSiteMap", out val))
                {
                    breadcrumbList.Insert(0, new BreadCrumbLinkItemViewModel
                       {
                           Title = node.DocumentName,
                           Reference = node.DocumentNamePath
                       });
                }
                node = node.Parent;
            }
            return breadcrumbList;
        }

        public static List<T> GetDocs<T>(string className) where T : TreeNode, new()
        {
            return HandleQueryableData<T>(
                q => q, //no constraints
                className,
                string.Format("cc_{0}_cn_{1}", CurrentCulture, className),
                string.Format("nodes|afton|{0}|all", className.ToLower())).ToList();
        }


        public static List<T> GetDocChildrenByName<T>(string childrenClassName, string docName,
            int limit = Int32.MaxValue)
            where T : TreeNode, new()
        {
            docName = docName.Replace(' ', '-');
            return HandleQueryableData<T>(
                q =>
                    q.Where(item => item.Parent.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase))
                        .Take(limit),
                childrenClassName,
                string.Format("cc_{0}_ccn_{1}_dn_{2}_lim_{3}", CurrentCulture, childrenClassName, docName, limit),
                string.Format("nodes|afton|{0}|all", childrenClassName.ToLower())
                ).ToList();
        }

        public static T GetDocByGuid<T>(Guid guid, string siteName = null) where T : class
        {
            return CacheHelper.Cache(cs =>
                _treeProvider.SelectSingleDocument(TreePathUtils.GetDocumentIdByDocumentGUID(guid, siteName ?? ConfigurationManager.AppSettings["SiteName"])) as T,
                new CacheSettings(CachingTime, string.Format("doc_guid_{0}", guid)));
        }

        public static T GetDocByDocId<T>(int docId) where T : class
        {
            return CacheHelper.Cache(cs =>
                _treeProvider.SelectSingleDocument(docId) as T,
                new CacheSettings(CachingTime, string.Format("doc_id_{0}", docId)));
        }

        public static T GetDocByNodeId<T>(int nodeId) where T : class
        {
            return CacheHelper.Cache(cs =>
                _treeProvider.SelectSingleNode(nodeId) as T,
                new CacheSettings(CachingTime, string.Format("node_id_{0}", nodeId)));
        }

        public static List<T> GetDocsByGuids<T>(IEnumerable<Guid> guids, string siteName = null) where T : class
        {
            return guids.Select(guid => GetDocByGuid<T>(guid, siteName)).Where(w => w != null).ToList();
        }

        public static List<TreeNode> GetDocsByPath(string aliasPath, int maxRelativeLevel = 1, string classNames = "*")
        {
            var cacheDependencyKey = "nodes|afton|all";
            return CacheHelper.Cache(cs =>
            {
                if (!string.IsNullOrWhiteSpace(cacheDependencyKey))
                    cs.CacheDependency = CacheHelper.GetCacheDependency(cacheDependencyKey);
                return (new TreeProvider().SelectNodes(new NodeSelectionParameters
                {
                    ClassNames = classNames,
                    SiteName = ConfigurationManager.AppSettings["SiteName"],
                    SelectAllData = true,
                    AliasPath = aliasPath + "/%",
                    MaxRelativeLevel = maxRelativeLevel,
                }) ?? new TreeNodeDataSet()).Where(i => i != null).ToList();
            },
                new CacheSettings(CachingTime,
                    string.Format("pth_{0}_mrl_{1}_cn_{2}", aliasPath, maxRelativeLevel, classNames)));
        }

        public static SearchResult PerformSearch(BaseSearchRequest request)
        {
            DocumentSearchCondition docCondition = new DocumentSearchCondition
            {
                Culture = LocalizationContext.CurrentCulture.CultureCode,
                ClassNames = request.ClassNames,
            };

            var condition = new SearchCondition(request.AdditiveQuery, SearchModeEnum.AllWords,
                SearchOptionsEnum.FullSearch, docCondition);
            var searchText = SearchSyntaxHelper.CombineSearchCondition(request.Query, condition);

            var parameters = new Search.SearchParameters
            {
                SearchFor = searchText,
                SearchSort = request.SortOrder,
                Path = "/%",
                ClassNames = null,
                CurrentCulture = LocalizationContext.CurrentCulture.CultureCode,
                DefaultCulture = null,
                CombineWithDefaultCulture = false,
                CheckPermissions = false,
                SearchInAttachments = false,
                User = null,
                SearchIndexes = request.IndexName,
                NumberOfResults = Int32.MaxValue,
                AttachmentWhere = null,
                AttachmentOrderBy = null,
                DisplayResults = request.RecordsOnPage,
                NumberOfProcessedResults = Int32.MaxValue,
                StartingPosition =
                    request.PageNumber.HasValue ? (request.PageNumber.Value - 1) * request.RecordsOnPage : 0,
            };

            var results = Search.SearchHelper.Search(parameters);
            if (results == null) return new SearchResult();
            return new SearchResult
            {
                ResultsCount = parameters.NumberOfResults,
                PageCount = (int)Math.Ceiling(1d * parameters.NumberOfResults / request.RecordsOnPage),
                Items = results.Tables[0].AsEnumerable().Select(s => new SearchResultItem
                {
                    Title = s.Field<string>("Title"),
                    Content = s.Field<string>("Content"),
                    Image = s.Field<string>("Image"),
                    Date = s.Field<string>("Created")
                }).ToList()
            };
        }

        public static List<UserInfo> GetUsers()
        {
            return CacheHelper.Cache(cs =>
            {
                return UserInfoProvider.GetUsers().ToList();
            }, new CacheSettings(CachingTime, "get_all_users"));
        }

        public static IEnumerable<CountryInfo> GetCountries()
        {
            return CacheHelper.Cache(cs =>
            {
                return CountryInfoProvider.GetAllCountries();
            }, new CacheSettings(CachingTime, "get_all_countries"));
        }

        public static CountryInfo GetCountryByGuid(Guid guid)
        {
            return CacheHelper.Cache(cs =>
            {
                return (CountryInfo)CountryInfoProvider.GetInfoByGuid(CountryInfo.OBJECT_TYPE, guid);
            }, new CacheSettings(CachingTime, string.Format("country_guid_{0}", guid)));
        }

        public static CountryInfo GetCountryById(int id)
        {
            return CacheHelper.Cache(cs =>
            {
                return (CountryInfo)CountryInfoProvider.GetInfoById(CountryInfo.OBJECT_TYPE, id);
            }, new CacheSettings(CachingTime, string.Format("country_id_{0}", id)));
        }

        internal static List<T> GetSiblings<T>(T node) where T : TreeNode, new()
        {
            return HandleQueryableData<T>(
                q => q.Where(n => n.Parent.DocumentID == node.Parent.DocumentID && n.DocumentID != node.DocumentID),
                node.ClassName,
                string.Format("siblings_cc_{0}_dn_{1}", CurrentCulture, node.DocumentID),
                string.Format("nodes|afton|{0}|all", node.ClassName.ToLower()))
                .ToList();
        }

        private static T HandleData<T>(Expression<Func<TreeNode, bool>> predicate, string className, string cacheKey,
            string cacheDependencyKey, string cachedependenciesFormat = "") where T : TreeNode, new()
        {
            T node;
            switch (PortalContext.ViewMode)
            {
                case ViewModeEnum.Preview:
                    {
                        node = (T)DocumentHelper.GetDocuments(className).Published(false)
                            .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                            .FirstOrDefault(predicate);
                        break;
                    }
                case ViewModeEnum.LiveSite:
                    {
                        if (!string.IsNullOrWhiteSpace(cacheKey))
                        {
                            node = CacheHelper.Cache(cs =>
                            {
                                TreeProvider tree = new TreeProvider();
                                var doc = tree.SelectNodes(className) //.Published()
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
                            node = (T)tree.SelectNodes(className).Published()
                                .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                                .FirstOrDefault(predicate);
                            //return (T)doc;
                        }
                        break;
                    }
                default:
                    {
                        node = (T)DocumentHelper.GetDocuments(className)
                            .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                            .FirstOrDefault(predicate);
                        break;
                        //return (T) doc;
                    }
            }

            if (node != null)
                SaveNode(node);
            return node;
        }

        private static void SaveNode(TreeNode node)
        {
            if (context.Items[ContentHelper.NodeIdKey] == null)
            {
                context.Items[ContentHelper.NodeIdKey] = node.NodeID;
                context.Items[ContentHelper.NodeAliasPathKey] = node.NodeAliasPath;
                context.Items[ContentHelper.ObjectNameKey] = node.NodeAlias;
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

        internal static List<TreeNode> GetNodes(string[] stringIds)
        {
            int intId;
            int[] intIds = stringIds.Where(id => int.TryParse(id, out intId)).Select(int.Parse).ToArray();
            return
                intIds.Select(id => DocumentHelper.GetDocument(id, new TreeProvider()))
                    .Where(item => item != null)
                    .ToList();
        }

        public static List<T> GetPersonalizedContent<T>(string className) where T : new()
        {

            return new List<T>() { new T() };
        }

        internal static List<PersonalizedTile> GetDocsOfTypes(List<string> typeList)
        {
            return CacheHelper.Cache(coll =>
            {
                var prv = new TreeProvider();
                var persTiles = new List<PersonalizedTile>();
                foreach (var type in typeList)
                {
                    string type1 = type;
                    var docs = CacheHelper.Cache(cs => prv.SelectNodes(type1), new CacheSettings(CachingTime, type1));
                    docs.ToList().ForEach(item =>
                    {
                        var tile = new PersonalizedTile();
                        tile.Load(item);
                        persTiles.Add(tile);
                    });
                }
                return persTiles;
            }, new CacheSettings(CachingTime, String.Join("", typeList)));
        }

        public static T GetDoc<T>(string className) where T : TreeNode, new()
        {
            return GetDoc<T>(className, arg => true);
        }

        public static T GetDoc<T>(string className, Func<T, bool> condition) where T : TreeNode, new()
        {
            var doc = GetDocs<T>(className).FirstOrDefault(condition);
            if (doc != null)
            {
                SaveNode(doc);
            }
            return doc;
        }
    }
}
