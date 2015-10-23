using System;
using System.Linq.Expressions;
using System.Reflection;

namespace Infrastructure.Mapper
{
    public class ReflectionHelper
    {
        public static MemberInfo FindProperty(LambdaExpression lambdaExpression)
        {
            Expression expression = lambdaExpression;
            bool flag = false;
            while (!flag)
            {
                switch (expression.NodeType)
                {
                    case ExpressionType.Convert:
                        expression = ((UnaryExpression)expression).Operand;
                        break;
                    case ExpressionType.Lambda:
                        expression = ((LambdaExpression)expression).Body;
                        break;
                    case ExpressionType.MemberAccess:
                        MemberExpression memberExpression = (MemberExpression)expression;
                        if (memberExpression.Expression.NodeType != ExpressionType.Parameter && memberExpression.Expression.NodeType != ExpressionType.Convert)
                            throw new ArgumentException(string.Format("Expression '{0}' must resolve to top-level member.", lambdaExpression), "lambdaExpression");
                        return memberExpression.Member;
                    default:
                        flag = true;
                        break;
                }
            }
            return null;
        }

        public static object GetValue(string property, object obj)
        {
            PropertyInfo pi = obj.GetType().GetProperty(property);
            return pi != null ? pi.GetValue(obj, null) : null;
        }

        public static PropertyInfo GetProperty<TValue, T>(Expression<Func<TValue, T>> expression)
        {
            Expression body = expression;
            if (body is LambdaExpression)
            {
                body = ((LambdaExpression)body).Body;
            }
            switch (body.NodeType)
            {
                case ExpressionType.MemberAccess:
                    return (PropertyInfo)((MemberExpression)body).Member;
                default:
                    throw new InvalidOperationException();
            }
        }

        public static string GetPropertyName<TValue, T>(Expression<Func<TValue, T>> expression)
        {
            return GetProperty(expression).Name;
        }
    }
}