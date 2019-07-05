import { User } from "./user";
import { Candidate } from "./candidate";
import { Children } from "./children";
import { Mechutanim } from "./mechutanim";
import { Parent } from "./parent";
import { Hospitalizition } from "./hospitalizition";
import { MigbalaCandidate } from "./migbala-candidate";
import { ValueListCandidate } from "./value-list-candidate";
import { Docs } from "./docs";

export class DetaileCandidate {
   
    User:User;
    Candidate:Candidate;
    Children:Children[];
    Parents:Parent[];
    Mechutanim:Mechutanim[];
    ValueListCandidate:ValueListCandidate[];
    Documents:Docs[];
    Hospitalizations:Hospitalizition[];
    MigbalaCandidates:MigbalaCandidate[];



    constructor(user?:User,  candidate?:Candidate,NameChildrenhilde?:Children[],parent?:Parent[], Mechutanim?:Mechutanim[],Document1?:Docs[], Hospitalizition?:Hospitalizition[],MigbalaCandidate?:MigbalaCandidate[], ValueListCandidate?:ValueListCandidate[])
             
    {

      // this.User=user;        
      // this.Candidate=candidate;     
      // this.Children=NameChildrenhilde;
      // this.Parents=parent;
      // this.Mechutanim=Mechutanim;
      // this.CriteronCandidates=CriteronCandidates;
      // this.Documents=Document1;
      // this.Hospitalizations=Hospitalizition;
      // this.MigbalaCandidates=MigbalaCandidate;

      this.User=new User();        
      this.Candidate=new Candidate();     
      this.Children= [];
      this.Parents=[];
      this.Mechutanim=[];
      this.Documents=[];
      this.Hospitalizations=[];
      this.MigbalaCandidates=[];
      this.ValueListCandidate=[];
    }    
}


