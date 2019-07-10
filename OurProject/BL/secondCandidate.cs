using DAL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class secondCandidate
    {

        public static shiduchimEntities context;
        static secondCandidate()
        {
            context = new shiduchimEntities();
            
        }


        public static void NotInterested(User u, string tz)//כאשר לוחץ על כפתור "לא מעונין" בכרטיסית ההצעה
        {
            Meeting m;
            if (u.Gender == true)//אם זכר
            {
                m = context.Meetings.FirstOrDefault(p => p.tzGroom == u.Tz && p.tzBride == tz);
                m.StatusGroom = 3;
            }
            else//אם נקבה
            {
                m = context.Meetings.FirstOrDefault(p => p.tzBride == u.Tz && p.tzGroom == tz);
                m.StatusGroom = 3;
            }
            context.Entry(m).State = EntityState.Modified;
            context.SaveChanges();

        }
        public static void Interested(User u, string tz)//כאשר לוחץ על כפתור "מעונין" בכרטיסית ההצעה
        {

            Meeting m;
            if (u.Gender == true)//אם זכר
            {
                m = context.Meetings.FirstOrDefault(p => p.tzGroom == u.Tz && p.tzBride == tz);
                m.StatusGroom =2;

            }
            else//אם נקבה
            {
                m = context.Meetings.FirstOrDefault(p => p.tzBride == u.Tz && p.tzGroom == tz);
                m.StatusGroom = 2;
            }
            context.Entry(m).State = EntityState.Modified;
            context.SaveChanges();
            SendMail.interestingSuggestMail(u, tz);
        }


        public static void maileToMatchmaker(string subject, string text)//שליחת מייל לשדכן
        {
            SendMail.mail3(text, subject, "shiduchlainyan@gmail.com");
        }
    }
}
