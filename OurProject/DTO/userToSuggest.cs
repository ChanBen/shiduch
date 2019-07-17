using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
   public class userToSuggest
    {
        public UserDTO user { get; set; }
        public bool IsActiv { get; set; }

        public userToSuggest(UserDTO user,bool IsActiv )
        {
            this.user = user;
            this.IsActiv = IsActiv;
        }

       

        
    }
}
