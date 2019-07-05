using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ParentDTO
    {
        public int ParentId { get; set; }
        public int? UserId { get; set; }
        public int? BornCountryId { get; set; }
        public int? MotzaCountryId { get; set; }
        public int? ParentKind { get; set; }
        public bool? Jew { get; set; }
        public bool? Relativ { get; set; }
        public string Describ { get; set; }
    }
}
