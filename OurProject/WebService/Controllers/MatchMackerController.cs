using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace WebService.Controllers
{
    public class MatchMackerController : ApiController
    {
        [Route("api/GetDetailsByTz")]
        [HttpPost]
        [ResponseType(typeof(DetailsCandidate))]
        public HttpResponseMessage loginCandidate(User user)//שולח לקלינט  את כל פרטי המשתמש)מקבל ת.ז.
        {
            var currentDetailsCandidate = BL.CandidateUser.LoginCandidate(user);

            return Request.CreateResponse(HttpStatusCode.OK, currentDetailsCandidate);
        }



        [Route("api/finishCompliteDetails")]
        [HttpPost]
       
        public IHttpActionResult finishCompliteDetails(DetailsCandidate dc)//מטפל בסיום השלמת פרטים (אחרי שהשדכןמסים את השלמת הפרטים)
        {
            BL.matchMaker.finishCompliteDetails(dc);
            return Ok("success");
        }

        [Route("api/GetListUserOfSuggestByTz")]
        [HttpGet]
        [ResponseType(typeof(UserDTO))]
        public HttpResponseMessage GetSuggestByTz(string Tz)//מחזיר רשימת משתמשים של הצעות למישהו מסוים ע"י ת.ז.
        {
           var AllSuggests= BL.matchMaker.GetListUserOfSuggestByTz(Tz);
             return Request.CreateResponse(HttpStatusCode.OK, AllSuggests);
        }





        [Route("api/GetAllSuggest")]
        [HttpGet]
        [ResponseType(typeof(Meeting))]
        public HttpResponseMessage GetAllSuggest()//מחזיר רשימת משתמשים של הצעות למישהו מסוים ע"י ת.ז.
        {
            var AllSuggests = BL.matchMaker.GetAllSuggests();
            return Request.CreateResponse(HttpStatusCode.OK, AllSuggests);
        }


        [Route("api/EditMeeting")]
        [HttpPost]
    
        public IHttpActionResult EditMeeting(Meeting m)//מחזיר רשימת משתמשים של הצעות למישהו מסוים ע"י ת.ז.
        {
            BL.matchMaker.EditMeeting(m);
            return Ok("success");
        }



        [Route("api/getAllCandidate")]
        [HttpGet]

        public HttpResponseMessage getAllCandidate()//מחזיר רשימת המועמדים.
        {
          List<User>   Allcandidate=BL.matchMaker.getAllCandidate();
            return Request.CreateResponse(HttpStatusCode.OK, Allcandidate);
        }

        [Route("api/registerMatchMaker")]
        [HttpPost]
        public IHttpActionResult registerMatchMaker(User user)//יצירת משתמש חדש השומר את שם המשתמש וסיסמה 
        {
            bool b=BL.matchMaker.registerMatchMaker(user);
            if(b)
            return Ok("success");
            else
                return BadRequest("User exists in the system");

        }


        [Route("api/saveDetailsMatchMaker")]
        [HttpPost]
        public IHttpActionResult saveDetailsMatchMaker(User user)//יצירת משתמש חדש השומר את שם המשתמש וסיסמה 
        {
             BL.matchMaker.saveDetailsMatchMaker(user);
                return Ok("success");
        }


        [Route("api/GetDetailsMatchMaker")]
        [HttpPost]
        public IHttpActionResult GetDetailsMatchMaker(User user)// שליחת פרטי השדכן לאנגולר 
        {
          User u=  BL.matchMaker.GetDetailsMatchMaker(user);
            if(u!=null)
            return Ok(u);
            return BadRequest("User exists in the system");

        }


    }
}
