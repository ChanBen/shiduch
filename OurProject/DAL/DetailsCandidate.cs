using DTO;
using System.Collections.Generic;

namespace DAL
{
    public class DetailsCandidate
    {
        public UserDTO User{ get; set; }
        public CandidateDTO Candidate{ get; set; }
        public List<childrenDTO> Children{ get; set; }
        public List<ParentDTO> Parents{ get; set; }
        public List<MechutanimDTO> Mechutanim{ get; set; }

        public List<DocumentDTO> Documents{ get; set; }
        public List<HospitalizationDTO> Hospitalizations{ get; set; }
        public List<MigbalaCandidateDTO> MigbalaCandidates { get; set; }
        public List<ValueListCandidateDTO> ValueListCandidate { get; set; }

      //  public Matchmaker Matchmaker{ get; set; }

    }
}
