import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { ValueList } from 'src/app/models/value-list';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';

@Component({
  selector: 'app-busines',
  templateUrl: './busines.component.html',
  styleUrls: ['./busines.component.css']
})
export class BusinesComponent implements OnInit {
  
  cand: DetaileCandidate;
  valueListID: number;
  numOccupation: number;

  constructor(public dCandidateService: CandidateService) { }

  ngOnInit() {
    this.cand = this.dCandidateService.currentCandidate;
  }

  addOccupation() {

    let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 30).length - this.numOccupation;
    if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 30).length > this.numOccupation)
      this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 30).splice(0, this.numOccupation);
    else
      for (let i = 0; i < paar * -1; i++) {

        var currntValueList = new ValueListCandidate();

        currntValueList.CriteriaId = 30;
        currntValueList.isSelf = true;
        this.cand.ValueListCandidate.push(currntValueList);
      }
  }
  getCritMoreOccupation() {
    return this.cand.ValueListCandidate.filter(p => p.CriteriaId == 30);
  }


}
