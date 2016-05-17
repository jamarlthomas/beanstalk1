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
            _pdfGenerator.Pds = GetTemplate((T) pdfGenerator.TNode); //_pdfGenerator.Template;
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
            var path = node.GetValue("Template", "").Replace("/","\\");
            string template="";
            if (!string.IsNullOrWhiteSpace(path))
            {
                template = File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + @"Pdf\" + path);
            }
            return template;
        }



      
    }
}