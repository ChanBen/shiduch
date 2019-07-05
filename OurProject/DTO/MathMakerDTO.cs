using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class MathMakerDTO
    {
        public int MatchmakingId { get; set; }
        public int? UserIdGroom { get; set; }
        public int? UserIdBride { get; set; }
        public int? UserIdMatchmaker { get; set; }
        public DateTime? DateWedding { get; set; }
        public string Describe { get; set; }
    }
}
