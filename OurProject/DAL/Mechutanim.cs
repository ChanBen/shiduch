//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Mechutanim
    {
        public int MechutanimId { get; set; }
        public Nullable<int> UserId { get; set; }
        public string City { get; set; }
        public string Fname { get; set; }
        public string Tel { get; set; }
    
        public virtual Candidate Candidate { get; set; }
    }
}
