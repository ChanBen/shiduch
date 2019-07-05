using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
  public  class CriterionDto
    {
        public int CriterionId { get; set; }
        public string NameCriterion { get; set; }
        public Nullable<int> KindCriterion { get; set; }
        public Nullable<int> MaxValue { get; set; }
        public Nullable<int> MinValue { get; set; }
        public string TableName { get; set; }
        public string FieldName { get; set; }
        public Nullable<int> category { get; set; }
        public static Criterion ConvertToDal(CriterionDto d) {
            return new Criterion()
            {
                category = d.category,
                CriterionId = d.CriterionId,
                FieldName = d.FieldName,
                KindCriterion = d.KindCriterion,
                MaxValue = d.MaxValue,
                MinValue = d.MinValue,
                NameCriterion = d.NameCriterion,
                TableName = d.TableName
            };
        }
        public static CriterionDto ConvertToDto(Criterion d) {
            return new CriterionDto()
            {
                category = d.category,
                CriterionId = d.CriterionId,
                FieldName = d.FieldName,
                KindCriterion = d.KindCriterion,
                MaxValue = d.MaxValue,
                MinValue = d.MinValue,
                NameCriterion = d.NameCriterion,
                TableName = d.TableName
            };
        }
        public static List<CriterionDto> ConvertToDtoList(List<Criterion> d)
        {
            List<CriterionDto> l = new List<CriterionDto>();
            d.ForEach(r => l.Add(ConvertToDto(r)));
            return l;
        }
        public static List<Criterion> ConvertToDalList(List<CriterionDto> d)
        {
            List<Criterion> l = new List<Criterion>();
            d.ForEach(r => l.Add(ConvertToDal(r)));
            return l;
        }
    }
}
