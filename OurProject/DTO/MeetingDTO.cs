using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
  public  class MeetingDTO
    {
       


        public int MeetingId { get; set; }
        public Nullable<System.DateTime> MeetingDate { get; set; }
        public Nullable<System.TimeSpan> start { get; set; }
        public Nullable<System.TimeSpan> end1 { get; set; }
        public string title { get; set; }
        public string Place { get; set; }
        public string tzGroom { get; set; }
        public string tzBride { get; set; }
        public Nullable<int> StatusGroom { get; set; }
        public Nullable<int> StatusBride { get; set; }
        public Nullable<int> KindMeeting { get; set; }
        public string backgroundColor { get; set; }
        public string borderColor { get; set; }
        public string textColor { get; set; }
    }
}
