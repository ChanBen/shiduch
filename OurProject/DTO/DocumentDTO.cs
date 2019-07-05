using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DocumentDTO
    {

        public int DocumentId { get; set; }
        public int? UserId { get; set; }
        public string Document1 { get; set; }
        public string Describe { get; set; }
    }
}
