using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class MigbalaCandidateDTO
    {
        public int MigbalaCandidateId { get; set; }
        public int? UserId { get; set; }
        
        public bool? Genetic { get; set; }
        public string Describe { get; set; }



        public int? KindMigbala { get; set; }
       
       
        public int? levelMigbala { get; set; }
    }
}
