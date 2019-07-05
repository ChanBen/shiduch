using DAL;
using DTO;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace BL
{
    public static class UpdateDB
    {
        public static shiduchimEntities context;
        static UpdateDB()
        {
            context = new shiduchimEntities();

        }


        public static bool UpdateUser(User user)
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
                currentUser.Status = user.Status;

                context.Entry(currentUser).State = EntityState.Modified;
                context.SaveChanges();
                return true;
            }

            return false;
        }
        public static bool UpdateCandidate(Candidate candidate, int userId)
        {
            Candidate currentCandidate = context.Candidates.FirstOrDefault(c => c.UserId == userId);
            if (currentCandidate != null)
            {
                currentCandidate.UserId = candidate.UserId;
                currentCandidate.TelRav = candidate.TelRav;
                currentCandidate.NameRav = candidate.NameRav;
                currentCandidate.NamePrevMarriage = candidate.NamePrevMarriage;
                currentCandidate.DescribeMigbala = candidate.DescribeMigbala;
                currentCandidate.ImageCandidate = candidate.ImageCandidate;


                return true;
            }
            else
            {
                candidate.UserId = userId;
                context.Candidates.Add(candidate);
            }
            context.SaveChanges();

            return false;
        }
        public static bool UpdateProfession(Profession profession, int userId)
        {
            Profession currentProfession = context.Professions.FirstOrDefault(c => c.UserId == userId);
            if (currentProfession != null)
            {
                currentProfession.UserId = profession.UserId;
                currentProfession.ProfessionName = profession.ProfessionName;
                currentProfession.MoneyForHour = profession.MoneyForHour;


                context.SaveChanges();
                return true;
            }
            else
            {
                context.Professions.Add(profession);
            }
            return false;
        }
        //userId ולא candidateId  כל הפונקציות האלה מקבלות 
        public static bool UpdateMechtanim(List<Mechutanim> mechutanim, int userId)
        {
            List<Mechutanim> currentMechutanim = new List<Mechutanim>();
            currentMechutanim.AddRange(context.Mechutanims.Where(c => c.UserId == userId));
            if (currentMechutanim.Count != 0)
            {
                Mechutanim me;
                foreach (var item in currentMechutanim)
                {
                    me = mechutanim.FirstOrDefault(m => m.MechutanimId == item.MechutanimId);
                    if (me != null)
                    {
                        item.UserId = me.UserId;
                        item.Fname = me.Fname;
                        item.Tel = me.Tel;
                        item.City = me.City;

                        context.Entry(item).State = EntityState.Modified;
                        context.SaveChanges();
                        mechutanim.Remove(me);
                    }

                }

                context.SaveChanges();
                return true;
            }
            if (mechutanim.Count != 0)
            {
                context.Mechutanims.AddRange(mechutanim);
                context.SaveChanges();
                return true;

            }
            return false;

        }
        public static bool Updateparents(List<Parent> parent, int userId)
        {
            List<Parent> currentParent = new List<Parent>();
            currentParent.AddRange(context.Parents.Where(c => c.UserId == userId));
            if (currentParent.Count != 0)
            {
                Parent pa;
                foreach (var item in currentParent)
                {
                    pa = parent.FirstOrDefault(p => p.ParentId == item.ParentId);
                    if (pa != null)

                    {
                        item.UserId = pa.UserId;
                        item.BornCountryId = pa.BornCountryId;
                        item.MotzaCountryId = pa.MotzaCountryId;
                        item.ParentKind = pa.ParentKind;
                        item.Jew = pa.Jew;
                        item.Describ = pa.Describ;
                        item.Relativ = pa.Relativ;
                        context.Entry(item).State = EntityState.Modified;
                        context.SaveChanges();
                        parent.Remove(pa);
                    }
                }

                context.SaveChanges();
                return true;
            }
            if (parent.Count != 0)
            {
                for (int i = 0; i < parent.Count; i++)
                    parent[i].UserId = userId;
                context.Parents.AddRange(parent);
                context.SaveChanges();
                return true;
            }

            return false;

        }
        public static bool UpdateChildren(List<Child> child, int userId)
        {
            List<Child> currentChild = new List<Child>();
            currentChild.AddRange(context.Children.Where(c => c.UserId == userId));
            if (currentChild.Count != 0)
            {
                Child ch;
                foreach (var item in currentChild)
                {
                    ch = child.FirstOrDefault(p => p.ChildrenId == item.ChildrenId);
                    if (ch != null)

                    {
                        item.UserId = ch.UserId;
                        item.BornDate = ch.BornDate;
                        item.NameChilde = ch.NameChilde;
                        context.Entry(item).State = EntityState.Modified;
                        context.SaveChanges();
                        child.Remove(ch);
                    }
                }

                context.SaveChanges();
                return true;
            }
            if (child.Count != 0)
            {
                for (int i = 0; i < child.Count; i++)
                    child[i].UserId = userId;
                context.Children.AddRange(child);
                context.SaveChanges();
                return true;
            }

            return false;

        }

        public static void UpdateValueListCandidate(List<ValueListCandidate> myValueListCandidate, int UserId)
        {

            List<ValueListCandidate> currentVLC = new List<ValueListCandidate>();//מכיל את רשימת הקריטריונים השייכים לאותו מועמד במסד
            currentVLC.AddRange(context.ValueListCandidates.Where(c => c.UserId == UserId));
            if (currentVLC.Count != 0)
            {
                ValueListCandidate VLC;
                foreach (var item in currentVLC)
                {
                    VLC = myValueListCandidate.FirstOrDefault(p => p.ValueListCandidateId == item.ValueListCandidateId);
                    if (VLC != null)

                    {
                        //context.Entry(VLC).State = EntityState.Modified;
                        item.satisfacMinValue = VLC.satisfacMinValue;
                        item.CriteriaId = VLC.CriteriaId;
                        item.satisfacBool = VLC.satisfacBool;
                        item.selfBool = VLC.selfBool;
                        item.ValueListId = VLC.ValueListId;
                        item.satisfacMaxValue = VLC.satisfacMaxValue;
                        item.selfValue = VLC.selfValue;

                        context.Entry(item).State = EntityState.Modified;
                        context.SaveChanges();
                        myValueListCandidate.Remove(VLC);

                    }
                }

                context.SaveChanges();

            }
            if (myValueListCandidate.Count != 0)
            {
                for (int i = 0; i < myValueListCandidate.Count; i++)
                    myValueListCandidate[i].UserId = UserId;
                context.ValueListCandidates.AddRange(myValueListCandidate);
                context.SaveChanges();

            }


        }
        public static void UpdateImage(string path, string tz)
        {
            Candidate c = context.Candidates.FirstOrDefault(p => p.UserId == context.Users.FirstOrDefault(pp => pp.Tz == tz).UserId);
            c.ImageCandidate = path;
            context.Entry(c).State = EntityState.Modified;
            context.SaveChanges();

        }
        public static void UpdateDoc(string path,string docName, string tz)
        {
            Document d = new Document();
            d.Describe = docName;
            d.Document1 = path;
            d.UserId = context.Users.FirstOrDefault(p => p.Tz == tz).UserId;
            context.Documents.Add(d);
            context.SaveChanges();
        }
        public static bool UpdateHospitalization(List<Hospitalization> hospitalization, int userId)
        {
            List<Hospitalization> currentHospi = new List<Hospitalization>();
            currentHospi.AddRange(context.Hospitalizations.Where(c => c.UserId == userId));
            if (currentHospi.Count != 0)
            {
                Hospitalization hos;
                foreach (var item in currentHospi)
                {
                    hos = hospitalization.FirstOrDefault(p => p.HospitalizationId == item.HospitalizationId);
                    if (hos != null)

                    {
                        item.UserId = hos.UserId;
                        item.NameDepartment = hos.NameDepartment;
                        item.TreatDoctor = hos.TreatDoctor;
                        item.TelTreatDr = hos.TelTreatDr;
                        item.NameHospital = hos.NameHospital;
                        item.FromDate = hos.FromDate;
                        item.UntilDate = hos.UntilDate;
                        item.Describ = hos.Describ;
                        context.Entry(item).State = EntityState.Modified;
                        context.SaveChanges();
                        hospitalization.Remove(hos);
                    }
                }

                context.SaveChanges();
                return true;
            }
            if (hospitalization.Count != 0)
            {
                for (int i = 0; i < hospitalization.Count; i++)
                    hospitalization[i].UserId = userId;
                context.Hospitalizations.AddRange(hospitalization);
                context.SaveChanges();
                return true;
            }

            return false;

        }
        public static bool UpdateMigbalaCandidate(List<MigbalaCandidate> migbalaCandidate, int userId)
        {
            List<MigbalaCandidate> currentMigbalaCandidate = new List<MigbalaCandidate>();
            currentMigbalaCandidate.AddRange(context.MigbalaCandidates.Where(c => c.UserId == userId));
            if (currentMigbalaCandidate.Count != 0)
            {
                MigbalaCandidate migCandidate;
                foreach (var item in currentMigbalaCandidate)
                {
                    migCandidate = migbalaCandidate.FirstOrDefault(p => p.MigbalaCandidateId == item.MigbalaCandidateId);
                    if (migCandidate != null)

                    {

                        item.UserId = migCandidate.UserId;
                        item.Describe = migCandidate.Describe;
                        item.KindMigbala = migCandidate.KindMigbala;
                        item.levelMigbala = migCandidate.levelMigbala;
                        item.Genetic = migCandidate.Genetic;
                        context.Entry(item).State = EntityState.Modified;
                        context.SaveChanges();
                        migbalaCandidate.Remove(migCandidate);
                    }
                }

                context.SaveChanges();
                return true;
            }
            if (migbalaCandidate.Count != 0)
            {
                for (int i = 0; i < migbalaCandidate.Count; i++)
                    migbalaCandidate[i].UserId = userId;
                context.MigbalaCandidates.AddRange(migbalaCandidate);
                context.SaveChanges();
                return true;
            }

            return false;

        }

    }
}

