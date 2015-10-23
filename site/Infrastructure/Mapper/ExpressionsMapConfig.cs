using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using EmitMapper.MappingConfiguration;
using EmitMapper.MappingConfiguration.MappingOperations;
using EmitMapper.Utils;

namespace Infrastructure.Mapper
{
    public class ExpressionsMapConfig<TFrom, TTo> : DefaultMapConfig
    {
        private readonly Dictionary<string, Func<TFrom, object>> _properties = new Dictionary<string, Func<TFrom, object>>();

        public ExpressionsMapConfig<TFrom, TTo> ForMember(Func<TFrom, object> fromFunc, string property)
        {
            if (!_properties.ContainsKey(property))
                _properties.Add(property, fromFunc);

            return this;
        }

        public ExpressionsMapConfig<TFrom, TTo> ForMember(Func<TFrom, object> fromFunc, Expression<Func<TTo, object>> toMember)
        {
            var prop = ReflectionHelper.FindProperty(toMember);
            return ForMember(fromFunc, prop.Name);
        }

        public ExpressionsMapConfig<TFrom, TTo> Ignore(Expression<Func<TTo, object>> toMember)
        {
            var prop = ReflectionHelper.FindProperty(toMember);
            IgnoreMembers<TFrom, TTo>(new[] { prop.Name });
            return this;
        }

        public override IMappingOperation[] GetMappingOperations(Type from, Type to)
        {
            var list = new List<IMappingOperation>();
            list.AddRange(base.GetMappingOperations(from, to));
            list.AddRange(FilterOperations(from, to, ReflectionUtils.GetPublicFieldsAndProperties(to).Where(f => _properties.ContainsKey(f.Name)).Select(
                            m => (IMappingOperation)new DestWriteOperation
                            {
                                Destination = new MemberDescriptor(m),
                                Getter = (ValueGetter<object>)
                                    (
                                        (value, state) =>
                                        {
                                            Debug.WriteLine("Mapper: getting value of field or property {0}", m.Name);
                                            return ValueToWrite<object>.ReturnValue(_properties[m.Name]((TFrom)value));
                                        }
                                    )
                            }
                        )
                    )
                );

            return list.ToArray();
        }
    }
}
