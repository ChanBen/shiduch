import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { Criterion } from 'src/app/models/criterion';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  cand: DetaileCandidate;
  numChozckot: number;
  numChulshot: number;
  HightAndWightCrit: ValueListCandidate[];
  criterionMare: Criterion[] = [];
  constructor(private dCandidateService: CandidateService) { }

  ngOnInit() {
    this.init1();
    this.dCandidateService.onLogined.subscribe(res => {
      this.init1();

    })
  }
  init1() {
    this.cand = this.dCandidateService.currentCandidate;
    this.criterionMare = this.dCandidateService.criterionsArr.filter(r => r.category == 4);//מילוי קריטריוני מראה כללי 
    if (!this.cand.User.Gender)
      this.criterionMare.splice(this.criterionMare.indexOf(this.criterionMare.find(p => p.CriterionId == 18)), 1);
    this.numChozckot = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 26 && p.isSelf == true).length;
    this.numChulshot = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 27 && p.isSelf == true).length;

  }
  addCHuzckot() {

    let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 26 && P.isSelf == true).length - this.numChozckot;
    if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 26 && P.isSelf == true).length > this.numChozckot)
      this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 26).splice(0, this.numChozckot);
    else
      for (let i = 0; i < paar * -1; i++) {

        var currntValueList = new ValueListCandidate();

        currntValueList.CriteriaId = 26;
        currntValueList.isSelf = true;
        this.cand.ValueListCandidate.push(currntValueList);
      }
  }


  addCHolshot() {

    let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27 && P.isSelf == true).length - this.numChulshot;
    if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27 && P.isSelf == true).length > this.numChulshot)
      this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27).splice(0, this.numChulshot);
    else
      for (let i = 0; i < paar * -1; i++) {

        var currntValueList = new ValueListCandidate();

        currntValueList.CriteriaId = 27;
        currntValueList.isSelf = true;
        this.cand.ValueListCandidate.push(currntValueList);
      }
  }

  HightAndWight() {//שייך למראה כללי

    this.HightAndWightCrit = this.cand.ValueListCandidate.filter(p => (p.CriteriaId == 17 || p.CriteriaId == 18) && p.isSelf == true);
    if (this.HightAndWightCrit.length == 0) {
      let VLC: ValueListCandidate;
      VLC = new ValueListCandidate();
      VLC.CriteriaId = 17;
      VLC.isSelf = true;
      this.cand.ValueListCandidate.push(VLC);
      VLC = new ValueListCandidate();
      VLC.isSelf = true;
      VLC.CriteriaId = 18;
      this.cand.ValueListCandidate.push(VLC);
      this.HightAndWightCrit = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 17 || p.CriteriaId == 18 && p.isSelf == true);

    }
    return this.HightAndWightCrit;

  }
}
