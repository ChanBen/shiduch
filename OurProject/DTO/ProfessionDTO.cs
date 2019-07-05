using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ProfessionDTO
    {
        public int UserId { get; set; }
        public string ProfessionName { get; set; }
        public decimal? MoneyForHour { get; set; }
    }
}
