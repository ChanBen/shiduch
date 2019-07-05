using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class childrenDTO
    {
        public int ChildrenId { get; set; }
        public int UserId { get; set; }
        public DateTime? BornDate { get; set; }
        public string NameChilde { get; set; }
    }
}
