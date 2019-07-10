using DAL;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace WebService.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RegisterController : ApiController
    {

        [Route("api/register")]
        [HttpPost]
        public IHttpActionResult register(User user)//יצירת משתמש חדש השומר את שם המשתמש וסיסמה 
        {
            if (BL.CandidateUser.Register(user) == true)

                return Ok("user add sucssesfully");
            else
                return BadRequest("userName exist dont valid");

        }


        [Route("api/loginCandidate")]
        [HttpPost]
        [ResponseType(typeof(DetailsCandidate))]
        public HttpResponseMessage loginCandidate(User user)//אם הכן המשתמש קיים שולח לקלינט  את כל פרטיו
        {
            var currentDetailsCandidate = BL.CandidateUser.LoginCandidate(user);
            if (currentDetailsCandidate != null)

                return Request.CreateResponse(HttpStatusCode.OK, currentDetailsCandidate);
            return Request.CreateResponse(HttpStatusCode.BadRequest, "user dont exists");
        }


        [Route("api/saveDetailsCandidate")]
        [HttpPost]
        public IHttpActionResult saveDetailsCandidate(DetailsCandidate dc)//שמירת כל פרטי המועמד
        {

            BL.CandidateUser.SaveDetailsCandidate(dc);
       
            return Ok("success");
        }





        [Route("api/GetAllowAccess")]
        [HttpPost]
        [ResponseType(typeof(int))]
        public IHttpActionResult GetAllowAccess(User user)
        {
            int? allowAccess;
            allowAccess = BL.CandidateUser.GetAllowAccess(user);
            if(allowAccess!=-1)

                return Ok(allowAccess);
            return BadRequest("user dont exist");
        }

        [Route("api/hagashatBakasha")]
        [HttpPost]
        public IHttpActionResult hagashatBakasha(DetailsCandidate dc)//מטפל בהגשת בקשת מועמד
        {

            BL.SendMail.hagashatBakasha(dc);


            return Ok("בקשתך התקבלה בהצלחה");
        }


        [HttpPost]
        [Route("api/UploadFile")]
        public HttpResponseMessage UploadFile(string id)
        {
            var pathToSql = " http://localhost:62698/UploadFile/";
            var allPath = "";
            HttpResponseMessage response = new HttpResponseMessage();
            var abc = Request.Properties.Values;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var directoryPath = HttpContext.Current.Server.MapPath("~/UploadFile/");
                    Directory.CreateDirectory(directoryPath + id);
                    allPath = directoryPath + id + "/" + postedFile.FileName;
                    postedFile.SaveAs(allPath);
                    pathToSql += id + "/" + postedFile.FileName;
                    BL.UpdateDB.UpdateImage(pathToSql, id);
                }
            }
            return response;
        }



        [HttpPost]
        [Route("api/UploadDoc")]
        public HttpResponseMessage UploadDoc(string id)
        {
        //http://localhost:62698/UploadFile/6587/XAAB8592.JPG
            var allPath = "";
            var pathToSql = " http://localhost:62698/UploadFile/";
            HttpResponseMessage response = new HttpResponseMessage();
            var abc = Request.Properties.Values;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var directoryPath = HttpContext.Current.Server.MapPath("~/UploadFile/");
                    Directory.CreateDirectory(directoryPath + id);
                    allPath = directoryPath + id + "/" + postedFile.FileName;
                    postedFile.SaveAs(allPath);
                    pathToSql+= id + "/" + postedFile.FileName;
                    BL.UpdateDB.UpdateDoc(pathToSql, postedFile.FileName, id);

                }
            }
            return response;
        }
    }
}
