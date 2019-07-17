import { Component, OnInit,OnDestroy } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { Criterion } from 'src/app/models/criterion';
import {Router } from '@angular/router';


@Component({
  selector: 'app-more-detailes',
  templateUrl: './more-detailes.component.html',
  styleUrls: ['./more-detailes.component.css']
})
export class MoreDetailesComponent implements OnInit,OnDestroy {
  cand: DetaileCandidate;
  criterionPratimNosafim:Criterion[];
  constructor(public dCandidateService: CandidateService, public Router: Router) { }

  ngOnInit() {
    this.init1();
    // this.dCandidateService.onLogined.subscribe(res => {
    //   this.init1();

    // })

  }
  init1() {
    this.cand = this.dCandidateService.cand;
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
    this.Router.navigate(['/detail-candidate/doc']);
  }
  ngOnDestroy(){
    // this.dCandidateService. saveDetailCandidate(this.cand).subscribe((res:DetaileCandidate)=>{});  
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
