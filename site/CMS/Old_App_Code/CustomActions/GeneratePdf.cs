using System;
using System.Configuration;
using System.IO;
using System.Linq;
using CMS;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Membership;
using CMS.Mvc.Helpers;
using CMS.Mvc.Old_App_Code.CustomActions;
using iTextSharp.text;
using iTextSharp.tool.xml;
using iTextSharp.tool.xml.css;
using iTextSharp.tool.xml.html;
using iTextSharp.tool.xml.parser;
using iTextSharp.tool.xml.pipeline.css;
using iTextSharp.tool.xml.pipeline.end;
using iTextSharp.tool.xml.pipeline.html;
using Document = iTextSharp.text.Document;
using iTextSharp.text.pdf;

[assembly: RegisterCustomClass("GeneratePdf", typeof(GeneratePdf))]

namespace CMS.Mvc.Old_App_Code.CustomActions
{

    public class GeneratePdf : DocumentWorkflowAction
    {
        private const string PDF_FILE_NAME_PATTERN = "{0}_{1}.pdf";
        private string _filePath;
        private TreeNode _tNode;
        private string _mediaFileFolder;
        private string _mediaFileReference;
        private string _fileName;
        public TreeNode TNode
        {
            get
            {
                if (_tNode == null)
                {
                    try
                    {
                        _tNode = Node;
                    }
                    catch (Exception)
                    {
                        // if running outside the custom action context (for development purposes)
                        _tNode = ContentHelper.GetDoc<Product>(Product.CLASS_NAME);
                    }
                }
                return _tNode;
            }
        }
        public string FilePath
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_filePath))
                {
                    _filePath = AppDomain.CurrentDomain.BaseDirectory + MediaFileFolder + FileName;
                }
                return _filePath;
            }
            set { _filePath = value; }
        }

        public string MediaFileFolder
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_mediaFileFolder))
                {
                    _mediaFileFolder = AftonData.MediaLibraries.PdfLibrary.LibraryPath;
                    if (!string.IsNullOrWhiteSpace(AftonData.MediaLibraries.PdfLibrary.FolderName))
                    {
                        _mediaFileFolder += AftonData.MediaLibraries.PdfLibrary.FolderName;
                    }
                }
                return _mediaFileFolder;
            }
        }

        public string MediaFileReference
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_mediaFileReference))
                {
                    _mediaFileReference = (@"\" + MediaFileFolder + FileName).Replace(@"\", @"/");
                }
                return _mediaFileReference;
            }
        }
        public string FileName
        {
            get
            {
                if (string.IsNullOrWhiteSpace(_fileName))
                {
                    _fileName = string.Format(PDF_FILE_NAME_PATTERN, TNode.DocumentName, TNode.DocumentCulture);
                }
                return _fileName;
            }
        }
        public string Pds { get; set; }
        public string Pdf { get; set; }
        public string Template
        {
            get
            {
                return TNode.GetValue("Template", "");
            }

        }

        public override void Execute()
        {
            string css = GetCss();

            FillProductTemplateWithValues();

            CreatePdf(Pdf, css);
            
            UpdatePdfReference();
            System.IO.File.WriteAllText(AppDomain.CurrentDomain.BaseDirectory+@"\Pdf\Temp\TestOutput.html",Pdf);

        }

        
        private void FillProductTemplateWithValues()
        {
            var pr = new TemplateTreeNode<Product>(this);
            pr

                .FillTemplate(p => p.Title)
                .FillTemplate(p => p.GetValue("HeaderImage", ""), "HeaderImage")
                .FillTemplate(p => p.Description)
                .FillTemplate(p => p.CoverImage)
                .FillTemplate(p => p.Application)
                .FillTemplate(p => p.Content)
                .FillTemplate(p => p.FooterMessage)
                .FillTemplate(p => p.MicrobotSolutionImage)
                .FillTemplate(p => p.MicrobotRobotImage)
                .FillTemplate(p => p.Parent.Parent.DocumentName, "SBUTitle")
                .FillTemplate(p => p.Parent.DocumentName, "SolutionTitle")
                .FillTemplate(p => p.MicrobotRobotImage, "PDSHeaderImage")
                .SetProperReferences()
                .FillTemplate(Domain, "Domain"); //Domain should be the last one

            Pdf = Pds;

        }

        public string Domain
        {
            get
            {
                return ConfigurationManager.AppSettings.Get("Domain");
            }
        }



        private void UpdatePdfReference()
        {
            TNode.SetValue("PdfReference", MediaFileReference);
            DocumentHelper.UpdateDocument(TNode, new TreeProvider(MembershipContext.AuthenticatedUser));
        }

        //private void SaveFileToMediaLbrary()
        //{
        //    var libraryInfo = MediaLibraryInfoProvider.GetMediaLibraryInfo(AftonData.MediaLibraries.PdfLibrary.LibrarryId);
        //    var fileInfo = new CMS.MediaLibrary.MediaFileInfo(FilePath, libraryInfo.LibraryID, AftonData.MediaLibraries.PdfLibrary.FolderName);
        //    fileInfo.FileGUID = Guid.NewGuid();
        //    fileInfo.FileTitle = TNode.DocumentName;
        //    fileInfo.FileName = FileName;
        //    fileInfo.FileDescription = string.Format("{0}_{1}", TNode.DocumentName, TNode.DocumentCulture);
        //    fileInfo.FileSiteID = SiteContext.CurrentSiteID;
        //    var gen = fileInfo.Generalized;
        //    if (fileInfo.CheckUniqueCodeName())
        //    {
        //        MediaFileInfoProvider.ImportMediaFileInfo(fileInfo, CMSActionContext.CurrentUser.UserID);
        //    }
        //}

        private string GetCss()
        {
            var baseDir = AppDomain.CurrentDomain.BaseDirectory;
            var css = File.ReadAllText(baseDir + @"\css\normalize.min.css");
            css += File.ReadAllText(baseDir + @"\fonts\fonts.css");
            css += File.ReadAllText(baseDir + @"\css\style-guide.min.css");
            return css;
        }
        private void CreatePdf(string html, string css)
        {
            try
            {
                Byte[] bytes;
                using (var ms = new MemoryStream())
                {
                    using (var doc = new Document(PageSize.A4, 0f, 0f, 0f, 0f))
                    {
                        using (var writer = PdfWriter.GetInstance(doc, ms))
                        {
                            doc.Open();
                            var cssResolver = new StyleAttrCSSResolver();
                            var msCss = XMLWorkerHelper.GetCSS(new MemoryStream(System.Text.Encoding.UTF8.GetBytes(css)));
                            cssResolver.AddCss(msCss);

                            HtmlPipelineContext htmlContext = new HtmlPipelineContext(null);
                            htmlContext.SetTagFactory(Tags.GetHtmlTagProcessorFactory());
                            htmlContext.AutoBookmark(false);
                            var htmlStream = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(html));

                            PdfWriterPipeline pdfPpl = new PdfWriterPipeline(doc, writer);
                            HtmlPipeline htmlPpl = new HtmlPipeline(htmlContext, pdfPpl);
                            CssResolverPipeline cssPpl = new CssResolverPipeline(cssResolver, htmlPpl);

                            new XMLParser(new XMLWorker(cssPpl, true)).Parse(htmlStream);
                            
                            doc.Close();
                        }
                    }
                    bytes = ms.ToArray();
                }
                SaveDocument(bytes);
            }
            catch (Exception exc)
            {
                //TODO log errror
            }
        }
        private void SaveDocument(byte[] bytes)
        {
            if (File.Exists(FilePath))
            {
                File.Delete(FilePath);
            }
            var file = File.Create(FilePath);
            file.Write(bytes, 0, bytes.Count());
            file.Close();
        }

        private void CreatePdf2(string html, string css)
        {
            try
            {
                Byte[] bytes;
                using (var ms = new MemoryStream())
                {
                    using (var doc = new Document())
                    {
                        using (var writer = PdfWriter.GetInstance(doc, ms))
                        {
                            doc.Open();
                            using (var msCss = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(css)))
                            {
                                using (var msHtml = new MemoryStream(System.Text.Encoding.UTF8.GetBytes(html)))
                                {

                                    XMLWorkerHelper.GetInstance().ParseXHtml(writer, doc, msHtml, msCss);
                                }
                            }
                            doc.Close();
                        }
                    }
                    bytes = ms.ToArray();
                }
                if (File.Exists(FilePath))
                {
                    File.Delete(FilePath);
                }
                var file = File.Create(FilePath);
                file.Write(bytes, 0, bytes.Count());
                file.Close();
            }
            catch (Exception exc)
            {
                //TODO log errror
            }
        }
    }
}