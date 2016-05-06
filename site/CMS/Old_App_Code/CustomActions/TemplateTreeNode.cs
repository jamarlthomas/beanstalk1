using System;
using System.Linq.Expressions;
using CMS.DocumentEngine;

namespace CMS.Mvc.Old_App_Code.CustomActions
{
    public class TemplateTreeNode<T> where T : TreeNode
    {
        private GeneratePdf _pdfGenerator;

        public TemplateTreeNode(GeneratePdf pdfGenerator)
        {
            _pdfGenerator = pdfGenerator;
            _pdfGenerator.Pds = _pdfGenerator.Template;
        }
        public TemplateTreeNode<T> FillTemplate(Expression<Func<T, string>> func)
        {
            var propertyName = GetPropertyName(func);
            var propertyValue = func.Compile().Invoke((T)_pdfGenerator.TNode);
            _pdfGenerator.Pds = _pdfGenerator.Pds.Replace(string.Format("{{{{{0}}}}}", propertyName), propertyValue);

            return this;
        }

        private string GetPropertyName(Expression<Func<T, string>> func)
        {
            var me = func.Body as MemberExpression;
            if (me == null)
                throw new ArgumentException("Wrong expression!");
            return me.Member.Name;
        }
    }
}