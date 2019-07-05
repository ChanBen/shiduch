import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { Criterion } from 'src/app/models/criterion';


@Component({
  selector: 'app-more-detailes',
  templateUrl: './more-detailes.component.html',
  styleUrls: ['./more-detailes.component.css']
})
export class MoreDetailesComponent implements OnInit {
  cand: DetaileCandidate;
  criterionPratimNosafim:Criterion[];
  constructor(private dCandidateService: CandidateService) { }

  ngOnInit() {
    this.init1();
    this.dCandidateService.onLogined.subscribe(res => {
      this.init1();

    })

  }
  init1() {
    this.cand = this.dCandidateService.currentCandidate;
    this.criterionPratimNosafim=this.dCandidateService.criterionsArr.filter(p=>p.category==6);
    
  }
  getCritLicense(){
  if( this.cand.ValueListCandidate.filter(p => p.CriteriaId == 22).length==0)
 { var currntValueList = new ValueListCandidate();
     currntValueList.isSelf = true;
     currntValueList.CriteriaId = 22;
     this.cand.ValueListCandidate.push(currntValueList);
   }
  return this.cand.ValueListCandidate.filter(p => p.CriteriaId == 22);
  //return new Array(num);

  }
}
