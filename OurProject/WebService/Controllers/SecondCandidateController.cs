using System.Collections;
using System.Web.Http;
using DTO;
using BL;
namespace WebService.Controllers
{
    public class SecondCandidateController : ApiController
    {
        [Route("api/Interested")]
        [HttpPost]
        public IHttpActionResult Interested([FromBody]ArrayList paramList)//מטפל במועמד שמעונין בהצעה
        {
            UserDTO u = Newtonsoft.Json.JsonConvert.DeserializeObject<UserDTO>(paramList[0].ToString());
            string tz = paramList[1].ToString();
             secondCandidate.Interested(BL.Conversions.UserDtoToDal(u), tz);
            return Ok("success");
        }


        [Route("api/NotInterseted")]
        [HttpPost]
        public IHttpActionResult NotInterseted([FromBody]ArrayList paramList)//מטפל במועמד שלא מעונין בהצעה
        {

            UserDTO u = Newtonsoft.Json.JsonConvert.DeserializeObject<UserDTO>(paramList[0].ToString());
            string tz = paramList[1].ToString();
            
            secondCandidate.NotInterested(BL.Conversions.UserDtoToDal(u), tz);
            return Ok("success");
        }


        [Route("api/mailToMatcmaker")]
        [HttpGet]
        public IHttpActionResult mailToMatcmaker(string subject, string text)//שליחת מייל לשדכן
        {
            SendMail.mail3(text, subject, "shiduchlainyan@gmail.com");
            return Ok("success");
        }
    }
}
