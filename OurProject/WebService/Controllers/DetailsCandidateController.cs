using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using DAL;

namespace WebService.Controllers
{
    //[RoutePrefix("API/DetailsCandidate")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DetailsCandidateController : ApiController
    {
        //[Route("/addDetailCandidate")]
        [HttpPost]
        public IHttpActionResult addDetailCandidate(DetailsCandidate dCandidate)
        {
            BL.CandidateUser.SaveDetailsCandidate(dCandidate);
            return Ok("success");
        }

        [HttpGet]
        [Route("api/DetailsCandidate")]
        public IHttpActionResult  getCritarion()
        {
            Criterion res = BL.CandidateUser.getCriterions();
            return Ok(res);
        }
    }
}
