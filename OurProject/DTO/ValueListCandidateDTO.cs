using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ValueListCandidateDTO
    {
        public int ValueListCandidateId { get; set; }
        public int? UserId { get; set; }
        public int? CriteriaId { get; set; }
        public int? selfValue { get; set; }
        public int? satisfacMinValue { get; set; }
        public int? satisfacMaxValue { get; set; }
        public int? ValueListId { get; set; }
        public bool? isSelf { get; set; }
        public bool? isInclude { get; set; }
        public bool? selfBool { get; set; }
        public bool? satisfacBool { get; set; }
    }
}
