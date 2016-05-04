using System;
using System.IO;
using System.Linq;
using CMS;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Old_App_Code;
using CMS.PortalEngine;
using iTextSharp.text.pdf;
using Document = iTextSharp.text.Document;

[assembly: RegisterCustomClass("GeneratePdf", typeof(GeneratePdf))]
namespace CMS.Mvc.Old_App_Code
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
                    catch (Exception exception)
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

        public override void Execute()
        {
            string css = GetCss();

            string template = GetHtml();

            FillTheTemplateWithValues();
            


            CreatePdf(Pds, css);

            //SaveFileToMediaLbrary();

            UpdatePdfReference();

        }

        private void FillTheTemplateWithValues()
        {
            var product = (Product) TNode;
            var pr = new TemplateTreeNode<Product>(TNode, Template);
            pr.FillTemplate(p => p.Description)
                .FillTemplate(p => p.Title);
        }

   

        private void UpdatePdfReference()
        {
            TNode.SetValue("PdfReference", MediaFileReference);
            DocumentHelper.UpdateDocument(TNode, new TreeProvider());
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
        


        private string GetHtml()
        {
            Template = string.Format(File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + @"Pdf\Template.html"), TNode.GetStringValue("Content", ""));
            return Template;
        }

        private string GetCss()
        {
            //return ".pdfcheck{color: rgb(12, 65, 154);}";
            var baseDir = AppDomain.CurrentDomain.BaseDirectory;
            return File.ReadAllText(baseDir + @"CMSAdminControls\CKEditor\style-guide.min.css");
        }

        private void CreatePdf(string html, string css)
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

                                    iTextSharp.tool.xml.XMLWorkerHelper.GetInstance().ParseXHtml(writer, doc, msHtml, msCss);
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

        public string Template { get; set; }
    }
}