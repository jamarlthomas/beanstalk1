using System;
using System.Web;
using CMS.DocumentEngine.Types;
using CMS.Localization;
using CMS.Mvc.ViewModels.Master;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.Personalization;
using Infrastructure.Mapper;
using ProductViewModel = CMS.Mvc.ViewModels.Product.ProductViewModel;
using CMS.Mvc.ViewModels.PrivacyTermsCookie;
//using CMS.Mvc.ViewModels.PrivacyTermsCookie;

namespace CMS.Mvc.Infrastructure
{
    public class UIMappingConfiguration : MappingConfiguration
    {
        public UIMappingConfiguration(IObjectMapper objectMapper) : base(objectMapper) { }

        protected override void Objects()
        {
            CreateMap<Product, ProductViewModel>()
                .ForMember(s => new HtmlString(s.Content), d => d.DefaultContent);
            CreateMap<Product, DownloadWidgetViewModel>();
            CreateMap<Product, RelatedProductCardViewModel>()
                .ForMember(s => s.Title, d => d.Header)
                .ForMember(s => s.HomeImage, d => d.ImageUrl)
                .ForMember(s => s.Description, d => d.Text)
                .ForMember(s => s.DocumentRoutePath, d => d.Reference)
                .ForMember(s => ((SolutionBusinessUnit)s.Parent.Parent).Title, d => d.Title)
                .ForMember(s => ((Solution)s.Parent).Title, d => d.SubHeader);

            CreateMap<PersonalizedTile, PersonalizationCardViewModel>()
                .ForMember( s => s.HomeImage, d => d.HomeImage )
                .ForMember( s => s.Title, d => d.Title )
                .ForMember( s => ( DateTime )s.Item.GetValue( "DocumentModifiedWhen" ), d => d.Date )
                .ForMember( s => s.Description, d => d.Description )
                .ForMember( s => s.Item.ClassName , d => d.TypeName )
                .ForMember(s => s.HomeTitle, d => d.HomeTitle)
                .ForMember( s => s.Item, d => d.Item );
            CreateMap<Solution, TileViewModel>()
                .ForMember(s => s.DocumentRoutePath, d => d.Reference);
            CreateMap<FAQPage, TileViewModel>()
                .ForMember(s => s.DocumentRoutePath, d => d.Reference);
            CreateMap<TermsAndAcronymsPage, TileViewModel>()
                .ForMember(s => s.DocumentRoutePath, d => d.Reference);
            CreateMap<ATCToolsPage, TileViewModel>()
                .ForMember(s => s.DocumentRoutePath, d => d.Reference);
            CreateMap<CultureInfo, CultureLinkViewModel>()
                .ForMember(s => s.CultureID.ToString(System.Globalization.CultureInfo.InvariantCulture), d => d.CultureId)
                .ForMember(s => (!string.IsNullOrWhiteSpace(s.CultureAlias)) ? s.CultureAlias : s.CultureShortName, d => d.Title)
                .ForMember(s => string.Format("?lang={0}", s.CultureCode), d => d.Reference);
            /*CreateMap<Privacyconstants, PrivacyTermCookieViewModel>()
                .ForMember(p => p.CookieContent, p => p.CookieContent )
                .ForMember(p => p.CookieHeader, p => p.CookieHeader)
                .ForMember(p => p.PrefCookieHeader, p => p.PerfCookieHeader)
                .ForMember(p => p.PerfCookieMessage, p => p.PerfCookieMessage)
                .ForMember(p => p.PrefCookieHeader, p => p.PrefCookieHeader)
                .ForMember(p => p.PrefCookieMessage, p => p.PrefCookieMessage)
                .ForMember(p => p.PrivacyContent, p => p.PrivacyContent)
                .ForMember(p => p.PrivacyHeader, p => p.PrivacyHeader)
                .ForMember(p => p.Fields.PrivacySidebar, p => p.PrivacySidebar)
                ;*/

        }
        protected override void Collections()
        {
            CreateListMap<Product, RelatedProductCardViewModel>();
            CreateListMap<PersonalizedTile, PersonalizationCardViewModel>();
            CreateListMap<Solution, TileViewModel>();
        }

    }


}
