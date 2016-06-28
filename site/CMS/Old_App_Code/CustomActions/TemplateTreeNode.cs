using System;
using System.Linq.Expressions;
using CMS.DocumentEngine;
using System.IO;
using HtmlAgilityPack;

namespace CMS.Mvc.Old_App_Code.CustomActions
{
    public class TemplateTreeNode<T> where T : TreeNode
    {
        private GeneratePdf _pdfGenerator;

        public TemplateTreeNode(GeneratePdf pdfGenerator)
        {
            _pdfGenerator = pdfGenerator;
            _pdfGenerator.Pds = GetTemplate((T)pdfGenerator.TNode);
        }


        public TemplateTreeNode<T> FillTemplate(Expression<Func<T, string>> func)
        {
            var propertyName = GetPropertyName(func);
            var propertyValue = func.Compile().Invoke((T)_pdfGenerator.TNode);
            _pdfGenerator.Pds = _pdfGenerator.Pds.Replace(string.Format("{{{{{0}}}}}", propertyName), propertyValue);

            return this;
        }
        public TemplateTreeNode<T> FillTemplate(Func<T, string> value, string entryName)
        {
            _pdfGenerator.Pds = _pdfGenerator.Pds.Replace(string.Format("{{{{{0}}}}}", entryName), value((T)_pdfGenerator.TNode));
            return this;
        }
        public TemplateTreeNode<T> FillTemplate(string value, string entryName)
        {
            _pdfGenerator.Pds = _pdfGenerator.Pds.Replace(string.Format("{{{{{0}}}}}", entryName), value);
            return this;
        }
        private string GetPropertyName(Expression<Func<T, string>> func)
        {
            var me = func.Body as MemberExpression;
            if (me == null)
                throw new ArgumentException("Wrong expression!");
            return me.Member.Name;
        }
        private string GetTemplate(T node)
        {
            var theme = node.GetValue("Theme", "Default");
            string template;
            if (theme.Equals("Default"))
            {
                template = File.ReadAllText(TemplateLocation + "style-guide-hm.html");
                template += File.ReadAllText(TemplateLocation + "style-guide-int.html");
            }
            else
            {
                template = File.ReadAllText(TemplateLocation + "style-guide-hm2.html");
                template += File.ReadAllText(TemplateLocation + "style-guide-int2.html");
            }
            return template;
        }

        public string TemplateLocation
        {
            get { return AppDomain.CurrentDomain.BaseDirectory + @"Pdf\Templates\"; }
        }

        internal TemplateTreeNode<T> SetProperReferences()
        {
            _pdfGenerator.Pds = _pdfGenerator.Pds.Replace("~", "");
            ParseAndInsertDomainPlaceholderWithHap();
            return this;
        }

        private void ParseAndInsertDomainPlaceholderWithHap()
        {
            HtmlDocument doc = new HtmlDocument();
            doc.OptionWriteEmptyNodes = true;
            doc.LoadHtml(_pdfGenerator.Pds);
            AddDomainToReferences(doc, "img", "src");
            AddDomainToReferences(doc, "link","href");
            _pdfGenerator.Pds = doc.DocumentNode.InnerHtml;
        }
        private void AddDomainToReferences(HtmlDocument doc, string tag, string attrName)
        {
            var node = doc.DocumentNode;
            var items = node.SelectNodes(string.Format("//{0}[@{1}]", tag, attrName));
            if(items == null || items.Count == 0) return;
            foreach (HtmlNode link in items)
            {
                HtmlAttribute att = link.Attributes[attrName];
                att.Value = "{{Domain}}" + att.Value;
            }
        }
    }
}