using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ValueListDTO
    {
        public int ValueListId { get; set; }
        public int? CriterionId { get; set; }
        public string Value { get; set; }
        public int? Index1 { get; set; }
    }
}
