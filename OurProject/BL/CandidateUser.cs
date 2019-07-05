using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;
namespace BL
{
    public class CandidateUser
    {

        public static void SaveDetailsCandidate(DetailsCandidate dc)// שמירת הנתונים של המועמד
        {

            using (shiduchimEntities context = new shiduchimEntities())
            {
                if (ExistUserInSql(dc.User.Password, dc.User.UserName))
                {
                    UpdateDB.UpdateUser (Conversions.UserDtoToDal( dc.User));//save only user
                    int userid = context.Users.FirstOrDefault(u => u.Password ==dc.User.Password /*&& u.userName==userName*/).UserId;

                    UpdateDB.UpdateCandidate(Conversions.CandidateDtoToDal( dc.Candidate), userid);

                    UpdateDB.UpdateMechtanim(Conversions.MechutanimListDtoToDAL( dc.Mechutanim), userid);

                    UpdateDB.UpdateChildren(Conversions.childrenListDtoToDAL( dc.Children), userid);


                    //UpdateDB.UpdateDocument(Conversions.DocumentListDtoToDAL( dc.Documents), userid);

                    UpdateDB.UpdateHospitalization(Conversions.HospitalizationListDtoToDAL( dc.Hospitalizations), userid);
                    UpdateDB.UpdateValueListCandidate(Conversions.ValueListCandidateListDtoToDAL( dc.ValueListCandidate), userid);

                    UpdateDB.UpdateMigbalaCandidate(Conversions.MigbalaCandidateListDtoToDAL( dc.MigbalaCandidates), userid);

                    UpdateDB.Updateparents(Conversions.ParentListDtoToDAL( dc.Parents), userid);
                    


                    context.SaveChanges();
                }



            }
        }
        public static void SaveDetailsProfession(DetailsProfession dp)// שמירת הנתונים של בעלי מקצוע
        {
            using (shiduchimEntities context = new shiduchimEntities())
            {
                if (ExistUserInSql(dp.User.Password, dp.User.UserName))
                {
                    UpdateDB.UpdateUser(Conversions.UserDtoToDal( dp.User));//save only user

                    UpdateDB.UpdateProfession(Conversions.ProfessionDtoToDal( dp.Profession), dp.User.UserId);

                    context.SaveChanges();
                }



            }
        }
        public static DetailsCandidate LoginCandidate(User user)//בדיקה אם המועמד קיים והחזרת כל פרטיו
        {
            using (shiduchimEntities context = new shiduchimEntities())
            {
                if (user.Tz != null)
                {
                    User u = new User();
                    u = context.Users.FirstOrDefault(p => p.Tz == user.Tz);
                    if (u == null)
                        return null;
                    user.Password = u.Password;
                    user.UserName = u.UserName;
                }
                if (ExistUserInSql(user.Password, user.UserName))
                {
                    User currentUser = context.Users.FirstOrDefault(u => u.Password == user.Password && u.UserName == user.UserName);
                    DetailsCandidate detailsCandidate = new DetailsCandidate();
                    detailsCandidate.User =Conversions.UserDaltoDTo(currentUser);
                    Candidate c = context.Candidates.FirstOrDefault(ch => ch.UserId == currentUser.UserId);
                    if(c!=null)
                    detailsCandidate.Candidate =Conversions.CandidateDalToDto( c);
                    detailsCandidate.MigbalaCandidates = new List<MigbalaCandidateDTO>();
                   detailsCandidate.MigbalaCandidates.AddRange(Conversions.MigbalaCandidateListDALToDto( context.MigbalaCandidates.Where(ch => ch.UserId == currentUser.UserId).ToList()));
                    
                    detailsCandidate.Children = new List<childrenDTO>();
                    detailsCandidate.Children.AddRange(Conversions.childrenListDALToDto( context.Children.Where(ch => ch.UserId == currentUser.UserId).ToList()));
                    detailsCandidate.Parents = new List<ParentDTO>();
                    detailsCandidate.Parents.AddRange(Conversions.ParentListDALToDto( context.Parents.Where(ch => ch.UserId == currentUser.UserId).ToList()));
                    detailsCandidate.Documents = new List<DocumentDTO>();
                    detailsCandidate.Documents.AddRange(Conversions.DocumentListDALToDto( context.Documents.Where(ch => ch.UserId == currentUser.UserId).ToList()));
                    detailsCandidate.ValueListCandidate = new List<ValueListCandidateDTO>();
                    detailsCandidate.ValueListCandidate.AddRange(Conversions.ValueListCandidateListDALToDto( context.ValueListCandidates.Where(ch => ch.UserId == currentUser.UserId).ToList()));
                    detailsCandidate.Hospitalizations = new List<HospitalizationDTO>();
                    detailsCandidate.Hospitalizations.AddRange(Conversions.HospitalizationListDALToDto( context.Hospitalizations.Where(ch => ch.UserId == currentUser.UserId).ToList()));
                    detailsCandidate.Mechutanim = new List<MechutanimDTO>();
                    detailsCandidate.Mechutanim.AddRange(Conversions.MechutanimListDALToDto( context.Mechutanims.Where(ch => ch.UserId == currentUser.UserId).ToList()));
                    return detailsCandidate;
                }
                return null;

            }
        }
        public static bool Register(User user)//בדיקה אם המשתמש קיים אם לא מוסיף חדש ומכניס שם משתמש וסיסמא  ושולח הודעה שהוסף בהצלחה
        {
            using (shiduchimEntities context = new shiduchimEntities())
            {
                if (ExistUserInSql(user.Password, user.UserName))//אם הסיסמה לא תקינה
                    return false;

                user.AllowAccess = 1;
                context.Users.Add(user);
                context.SaveChanges();
                return true;



            }

        }
        //public static bool PasswordUnitTest(string userName, string password)//פןנקציה זו עוברת לאנגולר בדיקת תקינות סיסמא
        //{
        //    //using (shiduchimEntities context = new shiduchimEntities())
        //    //{
        //    //    //GOTO......................
        //    //}
        //    return true;
        //}
        public static bool ExistUserInSql(string password, string userName)//בדיקת האם המשתשמ קיים
        {
            using (shiduchimEntities context = new shiduchimEntities())
            {
                User user = context.Users.FirstOrDefault(u => /*u.Password == password &&*/ u.UserName == userName);
                return user != null;
                //return context.Users.FirstOrDefault(u => u.Password == password /*&& u.userName==userName*/) != null;

            }
        }

        public static Criterion getCriterions()
        {


            using (shiduchimEntities context = new shiduchimEntities())
            {
                context.Configuration.ProxyCreationEnabled = false;
                return context.Criteria.FirstOrDefault(x => x.CriterionId != 5);
            }
        }//פונקציה לניסוי!!!!!!!!!!!!!!!!


        public static void FinishCompliteDetails(DetailsCandidate dc)
        {

            using (shiduchimEntities context = new shiduchimEntities())
            {
                Candidate c =Conversions.CandidateDtoToDal( dc.Candidate);
                c.EnterIn = 2;
                context.Entry(c).State = EntityState.Modified;
                context.SaveChanges();
               
            }
        }


        public static int? GetAllowAccess(User u)//מקבל שם משתמש וסיסמה ומחזיר את ההרשאת הגישה שלו
        {

            using (shiduchimEntities context = new shiduchimEntities())
            {
                User user = context.Users.FirstOrDefault(p => p.UserName == u.UserName && p.Password == u.Password);
                if(user!=null)
                return user.AllowAccess;
                return -1;
            }
        }

        

    }
}