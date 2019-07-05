using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class HospitalizationDTO
    {
        public int HospitalizationId { get; set; }
        public int? UserId { get; set; }
        public string NameDepartment { get; set; }
        public string TreatDoctor { get; set; }
        public string TelTreatDr { get; set; }
        public string NameHospital { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? UntilDate { get; set; }
        public string Describ { get; set; }
    }
}
