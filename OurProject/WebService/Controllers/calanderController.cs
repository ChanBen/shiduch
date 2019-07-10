using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using DAL;


namespace WebService.Controllers
{
    public class calanderController : ApiController
    {
        [Route("api/GetAllMeeting")]
        [HttpGet]
        [ResponseType(typeof(Meeting))]
        public IHttpActionResult GetAllMeeting()//החזרת כל הפגישות
        {
            var allMeeting = BL.calander.GetAllMeeting();
            return Ok(allMeeting);


        }

        [Route("api/GetMeetingByTz")]
        [HttpGet]
        [ResponseType(typeof(Meeting))]
        public IHttpActionResult GetMeetingByTz(string tz)//החזרת כל הפגישות
        {
            var allMeeting = BL.calander.GetMeetingByTz(tz);
            return Ok(allMeeting);


        }
        [Route("api/GetMeetingMatcMaker")]
        [HttpGet]
        [ResponseType(typeof(Meeting))]
        public IHttpActionResult GetMeetingMatcMaker()//החזרת כל הפגישות
        {
            var allMeeting = BL.calander.GetMeetingMatcMaker();
            return Ok(allMeeting);


        }

        [Route("api/addMeeting")]
        [HttpPost]
        public IHttpActionResult addMeeting(Meeting m)//החזרת כל הפגישות
        {
           Meeting me=  BL.calander.addMeeting(m);
            return Ok(me);


        }

        [Route("api/EditCalendarMeeting")]
        [HttpPost]
        public IHttpActionResult EditMeeting(Meeting m)//החזרת כל הפגישות
        {
           Meeting me= BL.calander.EditMeeting(m);
            return Ok(me);


        }


        [Route("api/deleteMeeting")]
        [HttpPost]
        public IHttpActionResult deleteMeeting(Meeting m)//מחיקת  פגישה
        {
            BL.calander.deleteMeeting(m);
            return Ok("success");


        }

    }
}