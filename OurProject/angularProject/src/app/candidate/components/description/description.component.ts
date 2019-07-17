import { Component, OnInit, OnDestroy } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { Criterion } from 'src/app/models/criterion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit, OnDestroy {
  cand: DetaileCandidate;
  numChozckot: number;
  numChulshot: number;
  HightAndWightCrit: ValueListCandidate[];
  criterionMare: Criterion[] = [];
  constructor(private dCandidateService: CandidateService, public Router: Router) { }

  ngOnInit() {
    this.init1();
    // this.dCandidateService.onLogined.subscribe(res => {
    //   this.init1();

    // })
  }
  ngOnDestroy() {


    // this.dCandidateService.saveDetailCandidate(this.cand).subscribe((res: DetaileCandidate) => { });

  }
  init1() {

    this.cand = this.dCandidateService.cand;
      
      this.criterionMare = this.dCandidateService.criterionsArr.filter(r => r.category == 4);//מילוי קריטריוני מראה כללי 
      if (!this.cand.User.Gender)
        this.criterionMare.splice(this.criterionMare.indexOf(this.criterionMare.find(p => p.CriterionId == 18)), 1);
      this.numChozckot = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 26 && p.isSelf == true).length;
      this.numChulshot = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 27 && p.isSelf == true).length;

  }
  addCHuzckot() {
    if (this.cand) {
      let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 26 && P.isSelf == true).length - this.numChozckot;
      if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 26 && P.isSelf == true).length > this.numChozckot)
     { let vlc=this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27);
      this.cand.ValueListCandidate.splice(this.cand.ValueListCandidate.indexOf( vlc[vlc.length-1]), 1);
      
        // this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 26).splice(0, this.numChozckot);
      }
      else
        for (let i = 0; i < paar * -1; i++) {

          var currntValueList = new ValueListCandidate();

          currntValueList.CriteriaId = 26;
          currntValueList.isSelf = true;
          this.cand.ValueListCandidate.push(currntValueList);
        }
    }
    this.dCandidateService.cand = Object.assign({}, this.cand);;
  }


  addCHolshot() {
    if (this.cand) {
      let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27 && P.isSelf == true).length - this.numChulshot;
      if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27 && P.isSelf == true).length > this.numChulshot)
       { let vlc=this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27);
        this.cand.ValueListCandidate.splice(this.cand.ValueListCandidate.indexOf( vlc[vlc.length-1]), 1);
          // this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 27).splice(0, this.numChulshot);
        }
      else
        for (let i = 0; i < paar * -1; i++) {

          var currntValueList = new ValueListCandidate();

          currntValueList.CriteriaId = 27;
          currntValueList.isSelf = true;
          this.cand.ValueListCandidate.push(currntValueList);
        }
    }
    this.dCandidateService.cand = Object.assign({}, this.cand);;
  }

  HightAndWight() {//שייך למראה כללי
    if (this.cand) {
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



  saveDetailCandidate() {//שומר את פרטי המועמד

    if (this.dCandidateService.allowAcceess == 1) {
      this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
        alert(res);
      });

    }
    else if (this.dCandidateService.allowAcceess == 2) {
      this.dCandidateService.finishCompliteDetails(this.cand).subscribe(res => {
        alert(res);
        this.Router.navigate(['/MatcMaker']);
      });
    }
  }

  saveAndContinue() {//שומר את פרטי המועמד וממשיך לתאב הבא
    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });

    //setActivePage('products')
    // this.router.navigate(['desc'], {relativeTo: this.activatedRoute});
    this.Router.navigate(['/detail-candidate/migbala']);
  }
  //id=idשל רשימת ערכים
  //crit=לקריטריון הנוכחי
  //ברגע שמשנה ערך של קריטריון
  changeValue(crit: number, id: any) {
    if (this.cand.ValueListCandidate.find(p => p.CriteriaId == crit) == null) {
      var currntValueList = new ValueListCandidate();
      currntValueList.ValueListId = id;//id.currentTarget.value;
      currntValueList.CriteriaId = crit;
      currntValueList.isSelf = true;
      this.cand.ValueListCandidate.push(currntValueList);
    }
    else {
      this.cand.ValueListCandidate.find(p => p.CriteriaId == crit).ValueListId = id;//.currentTarget.value;
    }
  }
}
