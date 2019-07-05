
using BL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace WebService.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class getValueListController : ApiController
    {
        shiduchimEntities DB = new shiduchimEntities();
        public getValueListController()
        {
            DB.Configuration.ProxyCreationEnabled = false;
        }
        [Route("api/getValueList")]
        [HttpGet]


        public IHttpActionResult GetValueList()//מחזיר רשימת ערכים 
        {
            //return Ok(ValueListC.getValueList().AsEnumerable());
          return Ok(DB.ValueLists.AsEnumerable());
        }

        [Route("api/GetCriteria")]
        [HttpGet]

        public IHttpActionResult getcriteria()//מחזיר רשימת קריטריונים 
        {
            return Ok(DB.Criteria.AsEnumerable());
            // return Ok(ValueListC.GetCriteria().AsEnumerable());
            // return Ok(CriterionDto.ConvertToDtoList(BL.ValueListC.GetCriteria().ToList()));
        }

    }
}
