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
        public static List<userToSuggest> GetListUserOfSuggestByTz(string Tz)//מחזירה את כל ההצעות של משתמש מסוים ע"פ ת.ז.
        {
            List<Meeting> lm = new List<Meeting>();
            List<userToSuggest> lu = new List<userToSuggest>();
            User u = context.Users.FirstOrDefault(p => p.Tz == Tz);
            bool gender = u.Gender == true;
            if (gender)//אם זה זכר
                lm = context.Meetings.Where(p => p.tzGroom == Tz && p.StatusGroom != 3).ToList();
            else//אם זה נקבה
                lm = context.Meetings.Where(p => p.tzBride == Tz && p.StatusBride != 3).ToList();

            foreach (var item in lm)
            {
                string hisTz = gender ? item.tzBride : item.tzGroom;
                bool isActive = gender ? !(item.StatusBride == 3 || context.Candidates.FirstOrDefault(p=>p.UserId==context.Users.FirstOrDefault(p1 => p1.Tz == hisTz).UserId).EnterIn==3) : !(item.StatusGroom == 3 || context.Candidates.FirstOrDefault(p => p.UserId == context.Users.FirstOrDefault(p1 => p1.Tz == hisTz).UserId).EnterIn == 3);
                UserDTO us = Conversions.UserDaltoDTo(context.Users.FirstOrDefault(p => p.Tz == hisTz));
                lu.Add(new userToSuggest(us, isActive));
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
            Meeting mSql = context.Meetings.FirstOrDefault(p => p.MeetingId == m.MeetingId);
            if (m.StatusBride != mSql.StatusBride)
            {
                User u = context.Users.FirstOrDefault(p => p.Tz == m.tzBride);
                if (m.StatusBride == 2)//שינה סטטוס למעונין
                    SendMail.interestingSuggestMail(u, m.tzGroom);
                if (m.StatusBride == 5)//סגירת שידוך
                { SendMail.closeMatch(u.Mail);
                    Candidate c = context.Candidates.FirstOrDefault(p => p.UserId == u.UserId);
                    c.EnterIn = 3;
                } 
            }
            if (m.StatusGroom != mSql.StatusGroom)
            {
                User u = context.Users.FirstOrDefault(p => p.Tz == m.tzGroom);
                if (m.StatusGroom == 2)//שינה סטטוס למעונין
                    SendMail.interestingSuggestMail(u, m.tzBride);
                if (m.StatusGroom == 5)//סגירת שידוך
                {
                    SendMail.closeMatch(u.Mail);
                    Candidate c = context.Candidates.FirstOrDefault(p => p.UserId == u.UserId);
                    c.EnterIn = 3;
                    context.Entry(c).State = EntityState.Modified;
                }
            }
            context.Entry(m).State = EntityState.Modified;
            context.SaveChanges();


        }


        public static List<User> getAllCandidate()//מחזיר את כל המועמדים
        {
            List<User> l = context.Users.ToList();
            return context.Users.Where(p =>p.AllowAccess==1).ToList();


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
