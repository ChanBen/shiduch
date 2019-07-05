using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public  class UserDTO
    {
        public int UserId { get; set; }
        public string Mail { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? BornDate { get; set; }
        public bool? Gender { get; set; }
        public string Cellphon { get; set; }
        public string Telephon { get; set; }
        public string CountryId { get; set; }
        public string CityId { get; set; }
        public string StreetId { get; set; }
        public int? BuildNum { get; set; }
        public int? AllowAccess { get; set; }
        public int? Status { get; set; }
    }
}
