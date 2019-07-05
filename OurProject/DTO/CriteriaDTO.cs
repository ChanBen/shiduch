using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CriteriaDTO
    {
        public int CriterionId { get; set; }
        public string NameCriterion { get; set; }
        public int? KindCriterion { get; set; }
        public int? MaxValue { get; set; }
        public int? MinValue { get; set; }
        public int? Interested { get; set; }
        public bool? multipleChoice { get; set; }
        public int? category { get; set; }
    }
}
