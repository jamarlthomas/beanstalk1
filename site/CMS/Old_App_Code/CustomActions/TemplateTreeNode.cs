using System;
using System.Linq.Expressions;
using CMS.DocumentEngine;
using System.IO;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Old_App_Code.CustomActions
{
    public class TemplateTreeNode<T> where T : TreeNode
    {
        private GeneratePdf _pdfGenerator;

        public TemplateTreeNode(GeneratePdf pdfGenerator)
        {
            _pdfGenerator = pdfGenerator;
            _pdfGenerator.Pds = GetTemplate((T)pdfGenerator.TNode); //_pdfGenerator.Template;
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
    }
}