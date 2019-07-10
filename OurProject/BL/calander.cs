using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using DAL;

namespace BL
{
    public class calander
    {
        public static shiduchimEntities context;
        static calander()
        {
            context = new shiduchimEntities();

        }

        public static List<Meeting> GetAllMeeting()//החזרת כל הפגישות
        {

            List<Meeting> m;
              m=  context.Meetings.Where(p => p.KindMeeting == 1 && p.StatusBride == 4 && p.StatusGroom == 4).ToList();
           
            return m;
        }
        public static List<Meeting> GetMeetingByTz(string tz)// החזרת כל הפגישות של מישהו מסועם ע"פ ת.ז.
        {

            return context.Meetings.Where(p => (p.KindMeeting == 1 && p.StatusBride == 4 && p.StatusGroom == 4)&&(p.tzBride==tz||p.tzGroom==tz)).ToList();
        }
        public static List<Meeting> GetMeetingMatcMaker()//החזרת כל הפגישות של השדכנים
        {

            List<Meeting> m;
            m = context.Meetings.Where(p => p.KindMeeting == 2 ).ToList();

            return m;
        }
        public static Meeting addMeeting(Meeting m)// יצירת פגישה חדשה
        {
            m.StatusGroom=4  ;
            m.StatusBride = 4;
            context.Meetings.Add(m);
            context.SaveChanges();
            return context.Meetings.FirstOrDefault(p => p.MeetingId == m.MeetingId);
          

        }
        public static Meeting EditMeeting(Meeting m)// עריכת פגישה
        {
            Meeting mSql= context.Meetings.Where(p => p.MeetingId == m.MeetingId).FirstOrDefault();
            mSql.Place = m.Place;
            mSql.start = m.start;
            mSql.end = m.end;
            mSql.tzBride = m.tzBride;
            mSql.tzGroom = m.tzGroom;
            mSql.StatusBride = m.StatusBride;
            mSql.StatusGroom = m.StatusGroom;
           
            context.Entry(mSql).State = EntityState.Modified;
            context.SaveChanges();
            return context.Meetings.FirstOrDefault(p => p.MeetingId == m.MeetingId);

        }

        public static void deleteMeeting(Meeting m)// מחיקת פגישה
        {
            Meeting x=context.Meetings.FirstOrDefault(p => p.MeetingId == m.MeetingId);
            context.Meetings.Remove(x);
            context.SaveChanges();

        }
       
    }
}
