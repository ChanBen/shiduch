using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CandidateDTO
    {
        public int UserId { get; set; }
        public string NamePrevMarriage { get; set; }
        public string NameRav { get; set; }
        public string TelRav { get; set; }
        public int? EnterIn { get; set; }
        public bool? BaitCham { get; set; }
        public string ImageCandidate { get; set; }
        public string DescribeMigbala { get; set; }
        public string personaldecription { get; set; }
    }
}
