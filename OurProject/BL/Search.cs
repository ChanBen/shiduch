using DAL;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//dfafadg
namespace BL
{
    public class Search
    {

        public static shiduchimEntities context;
        static Search()
        {
            context = new shiduchimEntities();
        }
        public static void search(DetailsCandidate dc)
        {


            Dictionary<string, string> d = new Dictionary<string, string>();
            List<User> allUser = context.Users.ToList();
            foreach (var item in allUser)//מעבר על כל המשתמשים
            {
                DetailsCandidate CurrentUser = CandidateUser.LoginCandidate(item);//הבאת כל פרטי המועמד הנוכחי
                if (CurrentUser.Candidate != null)
                    if (CurrentUser.Candidate.EnterIn == 2 && CurrentUser.User.Gender == !dc.User.Gender)//אם הוא מין המין הנוגד ןהוא במצב שאפשר לחפש לו
                    {

                        if (SuitAbleCrit(dc, CurrentUser) == true&& SuitAbleCrit(CurrentUser, dc) == true)//אם הקריטריונים של שתיהם מתאימים אחד לשני
                        {
                            if (dc.User.Gender == true)
                                d.Add(dc.User.Tz, CurrentUser.User.Tz);
                            else
                                d.Add(CurrentUser.User.Tz, dc.User.Tz);
                        }
                    }
            }

            
            AddSuggestToMeetingTable(d);



        }

        public static void AddSuggestToMeetingTable(Dictionary<string, string> d)//הוספת הצעה לטבלת הצעות
        {
            foreach (var item in d)
            {
                Meeting m = new Meeting();
                m.tzGroom = item.Key;
                m.tzBride = item.Value;
                m.StatusBride = 1;
                m.StatusGroom = 1;
                m.KindMeeting = 1;
                context.Meetings.Add(m);
                context.SaveChanges();
            }
        }

        public static bool SuitAbleCrit(DetailsCandidate dc, DetailsCandidate CurrentUser)
        {
            foreach (var VLC in dc.ValueListCandidate.Where(o => o.isSelf == false))//מעבר על הקריטריונים של המועמד שמחפסים לו שידוך
            {
                if (getKindCriteron(VLC.CriteriaId) == 3)//אם זה ערך מספרי
                {
                    var hisVLC = CurrentUser.ValueListCandidate.FirstOrDefault(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true);
                    if (hisVLC.selfValue < VLC.satisfacMinValue || hisVLC.selfValue > VLC.satisfacMaxValue)
                        return false;
                }

                else if (VLC.CriteriaId == 32)//אם זה סוג מגבלה
                {
                    foreach (var mig in CurrentUser.MigbalaCandidates)
                    {
                        if (mig.KindMigbala == VLC.ValueListId)
                            return false;
                    }
                }

                else if (getKindCriteron(VLC.CriteriaId) == 1)//אם זה ערך מרשימת ערכים
                {
                    List<ValueListCandidateDTO> currentUserVL = CurrentUser.ValueListCandidate.Where(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true).ToList();
                    if (currentUserVL.FirstOrDefault(p => p.ValueListId == VLC.ValueListId) != null && VLC.isInclude == false ||
                        currentUserVL.FirstOrDefault(p => p.ValueListId == VLC.ValueListId) == null && VLC.isInclude == true)
                        return false;
                }


                else if (getKindCriteron(VLC.CriteriaId) == 2)//אם זה ערך בוליאני
                {
                    if (VLC.selfBool != CurrentUser.ValueListCandidate.FirstOrDefault(p => p.CriteriaId == VLC.CriteriaId && p.isSelf == true).satisfacBool)
                        return false;
                }
            }
            return true;
        }

        public static int? getKindCriteron(int? critId)//(פונקציה זו מקבלת קוד קריטריון ומחזירה את הסוג שלו(מספרי/רשימת ערכים) =
        {
            return context.Criteria.FirstOrDefault(p => p.CriterionId == critId).KindCriterion;
        }
    }

}
