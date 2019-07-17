using DAL;
using DTO;
using System.Collections.Generic;

namespace BL
{
    public class Conversions
    {
        //------------------Mechutanim---------------------------------
        public static Mechutanim MechutanimDtoToDAL(MechutanimDTO me)
        {
            return new Mechutanim
            {
                MechutanimId = me.MechutanimId,
                UserId = me.UserId,
                City = me.City,
                Fname = me.Fname,
                Tel = me.Tel

            };
        }

        public static MechutanimDTO MechutanimDALToDto(Mechutanim me)
        {
            return new MechutanimDTO
            {
                MechutanimId = me.MechutanimId,
                UserId = me.UserId,
                City = me.City,
                Fname = me.Fname,
                Tel = me.Tel

            };
        }
        public static List<Mechutanim> MechutanimListDtoToDAL(List<MechutanimDTO> me)
        {
            List<Mechutanim> l = new List<Mechutanim>();
            me.ForEach(p => l.Add(MechutanimDtoToDAL(p)));
            return l;
        }
        public static List<MechutanimDTO> MechutanimListDALToDto(List<Mechutanim> me)
        {
            List<MechutanimDTO> l = new List<MechutanimDTO>();
            me.ForEach(p => l.Add(MechutanimDALToDto(p)));
            return l;
        }
        //------------------------Candidate=================
        public static Candidate CandidateDtoToDal(CandidateDTO can)
        {
            return new Candidate
            {
                UserId = can.UserId,


                NamePrevMarriage = can.NamePrevMarriage,
                NameRav = can.NameRav,
                TelRav = can.TelRav,
                EnterIn = can.EnterIn,
                BaitCham = can.BaitCham,
                ImageCandidate = can.ImageCandidate,
                DescribeMigbala = can.DescribeMigbala,
                personaldecription = can.personaldecription
            };

        }
        public static CandidateDTO CandidateDalToDto(Candidate can)
        {
            return new CandidateDTO
            {
                UserId = can.UserId,
                NamePrevMarriage = can.NamePrevMarriage,
                NameRav = can.NameRav,
                TelRav = can.TelRav,
                EnterIn = can.EnterIn,
                BaitCham = can.BaitCham,
                ImageCandidate = can.ImageCandidate,
                DescribeMigbala = can.DescribeMigbala,
                personaldecription = can.personaldecription
            };

        }
        public static List<Candidate> CandidateListDtoToDAL(List<CandidateDTO> me)
        {
            List<Candidate> l = new List<Candidate>();
            me.ForEach(p => l.Add(CandidateDtoToDal(p)));
            return l;
        }
        public static List<CandidateDTO> CandidateListDALToDto(List<Candidate> me)
        {
            List<CandidateDTO> l = new List<CandidateDTO>();
            me.ForEach(p => l.Add(CandidateDalToDto(p)));
            return l;
        }
        //=============user============
        public static User UserDtoToDal(UserDTO u)
        {
            return new User
            {
                UserId = u.UserId,
                Mail = u.Mail,
                Password = u.Password,
                UserName = u.UserName,
                Tz = u.Tz,
                FirstName = u.FirstName,
                LastName = u.LastName,
                BornDate = u.BornDate,
                Gender = u.Gender,
                Cellphon = u.Cellphon,
                Telephon = u.Telephon,
                CountryId = u.CountryId,
                CityId = u.CityId,
                StreetId = u.StreetId,
                BuildNum = u.BuildNum,
                AllowAccess = u.AllowAccess,
                Status = u.Status
            };

        }
        public static UserDTO UserDaltoDTo(User u)
        {
            return new UserDTO
            {
                UserId = u.UserId,
                Mail = u.Mail,
                Password = u.Password,
                UserName = u.UserName,
                Tz = u.Tz,
                FirstName = u.FirstName,
                LastName = u.LastName,
                BornDate = u.BornDate,
                Gender = u.Gender,
                Cellphon = u.Cellphon,
                Telephon = u.Telephon,
                CountryId = u.CountryId,
                CityId = u.CityId,
                StreetId = u.StreetId,
                BuildNum = u.BuildNum,
                AllowAccess = u.AllowAccess,
                Status = u.Status
            };

        }
        public static List<User> UserListDtoToDAL(List<UserDTO> me)
        {
            List<User> l = new List<User>();
            me.ForEach(p => l.Add(UserDtoToDal(p)));
            return l;
        }
        public static List<UserDTO> UserListDALToDto(List<User> me)
        {
            List<UserDTO> l = new List<UserDTO>();
            me.ForEach(p => l.Add(UserDaltoDTo(p)));
            return l;
        }
        //============children==================
        public static Child ChildDtoToDal(childrenDTO ch)
        {
            return new Child
            {
                ChildrenId = ch.ChildrenId,
                UserId = ch.UserId,
                BornDate = ch.BornDate,
                NameChilde = ch.NameChilde
            };

        }
        public static childrenDTO ChildDalToDto(Child ch)
        {
            return new childrenDTO
            {
                ChildrenId = ch.ChildrenId,
                UserId = ch.UserId,
                BornDate = ch.BornDate,
                NameChilde = ch.NameChilde
            };

        }
        public static List<Child> childrenListDtoToDAL(List<childrenDTO> me)
        {
            List<Child> l = new List<Child>();
            me.ForEach(p => l.Add(ChildDtoToDal(p)));
            return l;
        }
        public static List<childrenDTO> childrenListDALToDto(List<Child> me)
        {
            List<childrenDTO> l = new List<childrenDTO>();
            me.ForEach(p => l.Add(ChildDalToDto(p)));
            return l;
        }
        //============criteria==================
        public static Criterion CriteriaDtoToDal(CriteriaDTO c)
        {
            return new Criterion
            {
                CriterionId = c.CriterionId,
                NameCriterion = c.NameCriterion,
                KindCriterion = c.KindCriterion,
                MaxValue = c.MaxValue,
                MinValue = c.MinValue,
                Interested = c.Interested,
                multipleChoice = c.multipleChoice,
                category = c.category
            };

        }
        public static CriteriaDTO CriteriaDalToDto(Criterion c)
        {
            return new CriteriaDTO
            {
                CriterionId = c.CriterionId,
                NameCriterion = c.NameCriterion,
                KindCriterion = c.KindCriterion,
                MaxValue = c.MaxValue,
                MinValue = c.MinValue,
                Interested = c.Interested,
                multipleChoice = c.multipleChoice,
                category = c.category
            };

        }
        public static List<Criterion> CriterionListDtoToDAL(List<CriteriaDTO> me)
        {
            List<Criterion> l = new List<Criterion>();
            me.ForEach(p => l.Add(CriteriaDtoToDal(p)));
            return l;
        }
        public static List<CriteriaDTO> CriterionListDALToDto(List<Criterion> me)
        {
            List<CriteriaDTO> l = new List<CriteriaDTO>();
            me.ForEach(p => l.Add(CriteriaDalToDto(p)));
            return l;
        }

        //============document==================
        public static Document DocumentDtoToDal(DocumentDTO d)
        {
            return new Document
            {
                DocumentId = d.DocumentId,
                UserId = d.UserId,
                Document1 = d.Document1,
                Describe = d.Describe
            };

        }
        public static DocumentDTO DocumentDalToDto(Document d)
        {
            return new DocumentDTO
            {
                DocumentId = d.DocumentId,
                UserId = d.UserId,
                Document1 = d.Document1,
                Describe = d.Describe
            };

        }
        public static List<Document> DocumentListDtoToDAL(List<DocumentDTO> me)
        {
            List<Document> l = new List<Document>();
            me.ForEach(p => l.Add(DocumentDtoToDal(p)));
            return l;
        }
        public static List<DocumentDTO> DocumentListDALToDto(List<Document> me)
        {
            List<DocumentDTO> l = new List<DocumentDTO>();
            me.ForEach(p => l.Add(DocumentDalToDto(p)));
            return l;
        }

        //============hospitalizition==================
        public static Hospitalization HospitalizitionDtoToDal(HospitalizationDTO h)
        {
            return new Hospitalization
            {
                HospitalizationId = h.HospitalizationId,
                UserId = h.UserId,
                NameDepartment = h.NameDepartment,
                TreatDoctor = h.TreatDoctor,
                TelTreatDr = h.TelTreatDr,
                NameHospital = h.NameHospital,
                FromDate = h.FromDate,
                UntilDate = h.UntilDate,
                Describ = h.Describ
            };

        }
        public static HospitalizationDTO HospitalizitionDtoToDal(Hospitalization h)
        {
            return new HospitalizationDTO
            {
                HospitalizationId = h.HospitalizationId,
                UserId = h.UserId,
                NameDepartment = h.NameDepartment,
                TreatDoctor = h.TreatDoctor,
                TelTreatDr = h.TelTreatDr,
                NameHospital = h.NameHospital,
                FromDate = h.FromDate,
                UntilDate = h.UntilDate,
                Describ = h.Describ
            };

        }
        public static List<Hospitalization> HospitalizationListDtoToDAL(List<HospitalizationDTO> me)
        {
            List<Hospitalization> l = new List<Hospitalization>();
            me.ForEach(p => l.Add(HospitalizitionDtoToDal(p)));
            return l;
        }
        public static List<HospitalizationDTO> HospitalizationListDALToDto(List<Hospitalization> me)
        {
            List<HospitalizationDTO> l = new List<HospitalizationDTO>();
            me.ForEach(p => l.Add(HospitalizitionDtoToDal(p)));
            return l;
        }
        //============migbalaCandidate==================
        public static MigbalaCandidate MigbalaCandidateDtoToDal(MigbalaCandidateDTO m)
        {
            return new MigbalaCandidate
            {
                MigbalaCandidateId = m.MigbalaCandidateId,
                UserId = m.UserId,
                KindMigbala = m.KindMigbala,
                levelMigbala = m.levelMigbala,
                Genetic = m.Genetic,
                Describe = m.Describe
            };

        }
        public static MigbalaCandidateDTO MigbalaCandidateDalToDto(MigbalaCandidate m)
        {
            return new MigbalaCandidateDTO
            {
                MigbalaCandidateId = m.MigbalaCandidateId,
                UserId = m.UserId,
                KindMigbala = m.KindMigbala,
                levelMigbala = m.levelMigbala,
                Genetic = m.Genetic,
                Describe = m.Describe
            };

        }
        public static List<MigbalaCandidate> MigbalaCandidateListDtoToDAL(List<MigbalaCandidateDTO> me)
        {
            List<MigbalaCandidate> l = new List<MigbalaCandidate>();
            me.ForEach(p => l.Add(MigbalaCandidateDtoToDal(p)));
            return l;
        }
        public static List<MigbalaCandidateDTO> MigbalaCandidateListDALToDto(List<MigbalaCandidate> me)
        {
            List<MigbalaCandidateDTO> l = new List<MigbalaCandidateDTO>();
            me.ForEach(p => l.Add(MigbalaCandidateDalToDto(p)));
            return l;
        }
        //===============parent==============
        public static Parent ParentDtoToDal(DTO.ParentDTO p)
        {
            return new Parent
            {
                ParentId = p.ParentId,
                UserId = p.UserId,
                BornCountryId = p.BornCountryId,
                MotzaCountryId = p.MotzaCountryId,
                ParentKind = p.ParentKind,
                Jew = p.Jew,
                Describ = p.Describ,
                Relativ = p.Relativ
            };

        }
        public static ParentDTO ParentDalToDto(Parent p)
        {
            return new ParentDTO
            {
                ParentId = p.ParentId,
                UserId = p.UserId,
                BornCountryId = p.BornCountryId,
                MotzaCountryId = p.MotzaCountryId,
                ParentKind = p.ParentKind,
                Jew = p.Jew,
                Describ = p.Describ,
                Relativ = p.Relativ
            };

        }
        public static List<Parent> ParentListDtoToDAL(List<ParentDTO> me)
        {
            List<Parent> l = new List<Parent>();
            me.ForEach(p => l.Add(ParentDtoToDal(p)));
            return l;
        }
        public static List<ParentDTO> ParentListDALToDto(List<Parent> me)
        {
            List<ParentDTO> l = new List<ParentDTO>();
            me.ForEach(p => l.Add(ParentDalToDto(p)));
            return l;
        }
        //===============profession==============
        public static Profession ProfessionDtoToDal(ProfessionDTO p)
        {
            return new Profession
            {
                UserId = p.UserId,
                ProfessionName = p.ProfessionName,
                MoneyForHour = p.MoneyForHour
            };

        }
        public static ProfessionDTO ProfessionDalToDto(Profession p)
        {
            return new ProfessionDTO
            {
                UserId = p.UserId,
                ProfessionName = p.ProfessionName,
                MoneyForHour = p.MoneyForHour
            };

        }


        public static List<Profession> ProfessionListDtoToDAL(List<ProfessionDTO> me)
        {
            List<Profession> l = new List<Profession>();
            me.ForEach(p => l.Add(ProfessionDtoToDal(p)));
            return l;
        }
        public static List<ProfessionDTO> ProfessionListDALToDto(List<Profession> me)
        {
            List<ProfessionDTO> l = new List<ProfessionDTO>();
            me.ForEach(p => l.Add(ProfessionDalToDto(p)));
            return l;
        }
        //===============ValueListCandidate==============
        public static ValueListCandidate ValueListCandidateDtoToDal(ValueListCandidateDTO v)
        {
            return new ValueListCandidate
            {
                ValueListCandidateId = v.ValueListCandidateId,
                UserId = v.UserId,
                CriteriaId = v.CriteriaId,
                selfValue = v.selfValue,
                satisfacMinValue = v.satisfacMinValue,
                satisfacMaxValue = v.satisfacMaxValue,
                ValueListId = v.ValueListId,
                isSelf = v.isSelf,
                isInclude = v.isInclude,
                selfBool = v.selfBool,
                satisfacBool = v.satisfacBool
            };

        }
        public static ValueListCandidateDTO ValueListCandidateDalToDto(ValueListCandidate v)
        {
            return new ValueListCandidateDTO
            {
                ValueListCandidateId = v.ValueListCandidateId,
                UserId = v.UserId,
                CriteriaId = v.CriteriaId,
                selfValue = v.selfValue,
                satisfacMinValue = v.satisfacMinValue,
                satisfacMaxValue = v.satisfacMaxValue,
                ValueListId = v.ValueListId,
                isSelf = v.isSelf,
                isInclude = v.isInclude,
                selfBool = v.selfBool,
                satisfacBool = v.satisfacBool
            };

        }

        public static List<ValueListCandidate> ValueListCandidateListDtoToDAL(List<ValueListCandidateDTO> me)
        {
            List<ValueListCandidate> l = new List<ValueListCandidate>();
            me.ForEach(p => l.Add(ValueListCandidateDtoToDal(p)));
            return l;
        }
        public static List<ValueListCandidateDTO> ValueListCandidateListDALToDto(List<ValueListCandidate> me)
        {
            List<ValueListCandidateDTO> l = new List<ValueListCandidateDTO>();
            me.ForEach(p => l.Add(ValueListCandidateDalToDto(p)));
            return l;
        }
        //===============ValueList==============
        public static ValueList ValueListDtoToDal(ValueListDTO v)
        {
            return new ValueList
            {
                ValueListId = v.ValueListId,
                CriterionId = v.CriterionId,
                Value = v.Value,
                Index1 = v.Index1
            };

        }
        public static ValueListDTO ValueListDalToDto(ValueList v)
        {
            return new ValueListDTO
            {
                ValueListId = v.ValueListId,
                CriterionId = v.CriterionId,
                Value = v.Value,
                Index1 = v.Index1
            };

        }
        public static List<ValueList> ValueListListDtoToDAL(List<ValueListDTO> me)
        {
            List<ValueList> l = new List<ValueList>();
            me.ForEach(p => l.Add(ValueListDtoToDal(p)));
            return l;
        }
        public static List<ValueListDTO> ValueListListDALToDto(List<ValueList> me)
        {
            List<ValueListDTO> l = new List<ValueListDTO>();
            me.ForEach(p => l.Add(ValueListDalToDto(p)));
            return l;
        }

        //===============Meeting==============
        //public static Meeting MeetingDtoToDal(MeetingDTO m)
        //{
        //    return new Meeting
        //    {
        //        MeetingId = m.MeetingId,
        //        MeetingDate = m.MeetingDate,
        //        start = m.start,
        //        end1 = m.end1,
        //        title = m.title,
        //        Place = m.Place,
        //        tzGroom = m.tzGroom,
        //        tzBride = m.tzBride,
        //        StatusGroom = m.StatusGroom,
        //        StatusBride = m.StatusBride,
        //        KindMeeting = m.KindMeeting,
        //        backgroundColor = m.backgroundColor,
        //        borderColor = m.borderColor,
        //        textColor = m.textColor

        //    };

        //}
        //public static MeetingDTO MeetingDalToDto(Meeting m)
        //{
        //    return new MeetingDTO
        //    {
        //        MeetingId = m.MeetingId,
        //        MeetingDate = m.MeetingDate,
        //        start = m.start,
        //        end1 = m.end1,
        //        title = m.title,
        //        Place = m.Place,
        //        tzGroom = m.tzGroom,
        //        tzBride = m.tzBride,
        //        StatusGroom = m.StatusGroom,
        //        StatusBride = m.StatusBride,
        //        KindMeeting = m.KindMeeting,
        //        backgroundColor = m.backgroundColor,
        //        borderColor = m.borderColor,
        //        textColor = m.textColor

        //    };

        //}
        //public static List<Meeting> MeetingListDtoToDal(List<MeetingDTO> me)
        //{
        //    List<Meeting> l = new List<Meeting>();
        //    me.ForEach(p => l.Add(MeetingDtoToDal(p)));
        //    return l;
        //}



        //public static List<MeetingDTO> MeetingListDalToDto(List<Meeting> me)
        //{
        //    List<MeetingDTO> l = new List<MeetingDTO>();
        //    me.ForEach(p => l.Add(MeetingDalToDto(p)));
        //    return l;
        //}
    }
}
