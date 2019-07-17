using DAL;
using System.Collections.Generic;
using System.Linq;

namespace BL
{
    public  class ValueListC
    {
        public static List<string> getColorEye()//החזרת רשימת צבע עיננם
        {
            using (shiduchimEntities context = new shiduchimEntities())
            {
                List<string> eyeColor = context.ValueLists.Where(c => c.CriterionId == 1).Select(x => x.Value).ToList();

                return eyeColor;
            }
        }

        public static List<ValueList> getValueList()//החזרת כל רשימת הערכים
        {
            using (shiduchimEntities context = new shiduchimEntities())
            {
                return context.ValueLists.ToList();


            }
        }
        public static List<Criterion> GetCriteria()//החזרת כל הקריטריונים
        {
            using (shiduchimEntities context = new shiduchimEntities())
            {
                return context.Criteria.ToList();


            }
        }
    }
}
