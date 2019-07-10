using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

using DAL;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;

namespace BL
{
    public class SendMail
    {
        public static shiduchimEntities context;
        static SendMail()
        {
            context = new shiduchimEntities();

        }

        public static MailMessage mail3(string text,string subject,string mailToSend)
        {
            try
            {
                string mailSend = "shiduchlainyan@gmail.com";
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.Port = 587;
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = new System.Net.NetworkCredential("shiduchlainyan@gmail.com", "ahsul123");// Enter senders User name and password
                smtp.EnableSsl = true;
                MailMessage mail = new MailMessage(mailToSend, mailSend, subject, text);

                mail.BodyEncoding = UTF8Encoding.UTF8;
                //mail.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                var x = ex.Message;
            }
            return new MailMessage();
        }

        public static void hagashatBakasha(DetailsCandidate dc)//שומרת פרטי מועמד ושולחת מייל לשדכן לקביעת פגישה
        {
            string subject = "פגישה עם שדכן";
            string text = "מועמד בשם" +dc.User.FirstName + " " + dc.User.LastName + "בעל ת.ז. שמיספרה " + dc.User.Tz + "שלח הגשת בקשה לקביעת פגישת שדכן";
            CandidateUser.SaveDetailsCandidate(dc);
            mail3(text,subject, "shiduchlainyan@gmail.com");

        }
        //public void g(User u)
        //{
        //    mail3(u);

        //}
        public static void interestingSuggestMail(User u, string tz)//כאשר משתמש לחץ על כפתור מעונין בהצעה
        {
            
            User interesUser = context.Users.FirstOrDefault(p => p.Tz == tz);
            string subject = "מעונין בהצעה";
            string text = "מועמד בשם" + u.FirstName + " " + u.LastName + "בעל ת.ז.  " + u.Tz + "מעונין להפגש עם " + interesUser.FirstName + " " + interesUser.LastName + "בעל ת. ז. " + interesUser.Tz;
            mail3(text,subject, "shiduchlainyan@gmail.com");

        }

        public static void addSuggesrToCandidateMail(string mail)//כשנוספה הצעה חדשה למועמד
        {

           
            string subject = "שידוך לעינין";
            string text = "מועמד יקר שים לב יש לך הצעות חדשות בהצלחה!!!";
            mail3(text, subject,mail);

        }


    }
}