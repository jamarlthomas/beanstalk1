using System;
using CMS.DocumentEngine;
using System.Linq.Expressions;

namespace CMS.Mvc.Old_App_Code
{
    public class TemplateTreeNode<T> where T: TreeNode
    {
        private TreeNode TNode;
        private string Template;
        public string Pds;
    
        public TemplateTreeNode(TreeNode TNode, string Template)
        {
            this.TNode = TNode;
            this.Template = Template;
            this.Pds = Template;
        }
        public TemplateTreeNode<T> FillTemplate(Expression<Func<T, string>> func)
        {
            var propertyName = GetPropertyName(func);
            var propertyValue = func.Compile().Invoke((T) TNode);
            Pds = Pds.Replace(propertyName, propertyValue);
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
