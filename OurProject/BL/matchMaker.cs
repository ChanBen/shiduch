using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BL
{
    public class matchMaker
    {
        public static shiduchimEntities context;
        static matchMaker()
        {
            context = new shiduchimEntities();
        }
        public static void finishCompliteDetails(DetailsCandidate dc)//פונקציה המטפלת בסיום השלמת פרטים של המועמד(נשלח ע"י השדכן)
        {

            CandidateUser.SaveDetailsCandidate(dc);
            context.Candidates.FirstOrDefault(p => p.UserId == dc.Candidate.UserId).EnterIn = 2;
            context.SaveChanges();
            if (Search.search(dc) == true)
                SendMail.addSuggesrToCandidateMail(dc.User.Mail);
        }
        public static List<UserDTO> GetListUserOfSuggestByTz(string Tz)//מחזירה את כל ההצעות של משתמש מסוים ע"פ ת.ז.
        {
            List<Meeting> lm = new List<Meeting>();
            List<UserDTO> lu = new List<UserDTO>();
            User u = context.Users.FirstOrDefault(p => p.Tz == Tz);
            bool gender = u.Gender == true;
            if (gender)//אם זה זכר
                lm = context.Meetings.Where(p => p.tzGroom == Tz && p.StatusGroom != 3).ToList();
            else//אם זה נקבה
                lm = context.Meetings.Where(p => p.tzBride == Tz && p.StatusBride != 3).ToList();

            foreach (var item in lm)
            {
                string hisTz = gender ? item.tzBride : item.tzGroom;
                lu.Add(Conversions.UserDaltoDTo(context.Users.FirstOrDefault(p => p.Tz == hisTz)));
            }
            return lu;

        }



        public static List<Meeting> GetAllSuggests()//מחזירה את כל ההצעות.
        {
            List<Meeting> m = context.Meetings.Where(p => p.KindMeeting == 1).ToList();
            return m;
        }


        public static void EditMeeting(Meeting m)//מעדכן שינויים בפגישה
        {
            context.Entry(m).State = EntityState.Modified;
            context.SaveChanges();


        }


        public static List<User> getAllCandidate()//מחזיר את כל המועמדים
        {
            List<User> l = context.Users.ToList();
            return context.Users.Where(p => context.Candidates.FirstOrDefault(o => o.UserId == p.UserId)!=null).ToList();


        }
        public static bool registerMatchMaker(User u)//הרשמת שם משתמש וסיסמה של שדכן
        {
            if (CandidateUser.ExistUserInSql(u.Password, u.UserName))
                return false;
            context.Users.Add(u);
            context.SaveChanges();
            return true;


        }
        public static bool saveDetailsMatchMaker(User user)//שמירת פרטי שדכן
        {

            User currentUser = context.Users.FirstOrDefault(u => u.Password == user.Password && u.UserName == user.UserName);
            if (currentUser != null)
            {
                currentUser.FirstName = user.FirstName;
                currentUser.LastName = user.LastName;
                currentUser.Mail = user.Mail;
                currentUser.Telephon = user.Telephon;
                currentUser.Tz = user.Tz;
                currentUser.Gender = user.Gender;
                currentUser.BornDate = user.BornDate;
                currentUser.Cellphon = user.Cellphon;
                currentUser.Telephon = user.Telephon;
                currentUser.CityId = user.CityId;
                currentUser.CountryId = user.CountryId;
                currentUser.StreetId = user.StreetId;
                currentUser.BuildNum = user.BuildNum;
                currentUser.AllowAccess = 2;

                context.Entry(currentUser).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }

            return false;

        }



        public static User GetDetailsMatchMaker(User u)// שליחת פרטי השדכן לאנגולר
        {
            return context.Users.FirstOrDefault(p => p.Password == u.Password && p.UserName == u.UserName);


        }



    }
}
