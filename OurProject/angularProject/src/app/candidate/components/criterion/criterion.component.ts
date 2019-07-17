import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { Criterion } from 'src/app/models/criterion';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.css']
})
export class CriterionComponent implements OnInit, OnDestroy {
  selectedCrit: number;
  criterionsArrNotInteresting: Criterion[] = []//מכיל רק את רשימת הקריטריונים של לא מעונין
  criterionsArrInteresting: Criterion[] = []//מכיל את רשימת הקריטריונים למעונין
  cand: DetaileCandidate;
  @ViewChild('frm', { static: true }) public form: NgForm;
  constructor(private dCandidateService: CandidateService, public router: Router) { }

  ngOnInit() {
    this.init1();
    // this.dCandidateService.onLogined.subscribe(res => {
    //   this.init1();

    // })
  }
  ngOnDestroy() {
  }

  init1() {
    this.cand = this.dCandidateService.cand;
    this.criterionsArrNotInteresting = this.dCandidateService.criterionsArr.filter(p => p.Interested == 2 || p.Interested == 3 || p.Interested == 5);
    this.criterionsArrInteresting = this.dCandidateService.criterionsArr.filter(p => p.Interested == 1 || p.Interested == 2 || p.Interested == 5);
    this.cand.ValueListCandidate.filter(l => l.isSelf == false).forEach(o => this.interested(this.dCandidateService.criterionsArr.find(p => p.CriterionId == o.CriteriaId)));
  }

  //(ברגע שבחר קריטריון נוסף(עדיין לא בחר לו ערך
  addCriteronList(toInclude: number) {
    //debugger
    let newVal = new ValueListCandidate();
    newVal.CriteriaId = +this.selectedCrit;
    newVal.isSelf = false;
    newVal.isInclude = toInclude == 1 ? true : false;
    this.cand.ValueListCandidate.push(newVal);

    let removeCrit = this.dCandidateService.criterionsArr.find(p => p.CriterionId == this.selectedCrit);
    this.interested(removeCrit);
  }
  interested(removeCrit: Criterion) {//משנה את מערכי המעונין/לא מעונין ברשימת הקריטריונים
    if (!removeCrit.multipleChoice) {
      if (removeCrit.Interested == 2 || removeCrit.Interested == 3 || removeCrit.Interested == 5)
        this.criterionsArrNotInteresting.splice(this.criterionsArrNotInteresting.indexOf(removeCrit), 1);
      if (removeCrit.Interested == 1 || removeCrit.Interested == 2 || removeCrit.Interested == 5)
        this.criterionsArrInteresting.splice(this.criterionsArrInteresting.indexOf(removeCrit), 1);

    }
  }


  getKindCriterion(id: number) {
    let kindID = null;
    let found = this.dCandidateService.criterionsArr
      .find(p => p.CriterionId == id);
    if (found) {
      kindID = found.KindCriterion;
    }
    return kindID;
  }

  getCriterionName(id) {
    let name = "";
    let found = this.dCandidateService.criterionsArr.find(p => p.CriterionId == +id);
    if (found) {
      name = found.NameCriterion;
    }
    return name;
  }




  hagashatBakasha() {// c sharp פונקצית הגשת בקשה  שליחת מייל לשדכן לקביעת פגישה וכן שמירת פרטיו ב
    this.dCandidateService.hagashatBakasha(this.cand).subscribe(res => {
      alert(res);
    });
  }

  saveDetailCandidate() {//שומר את פרטי המועמד

    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });


  }
  submitAll() {
    this.dCandidateService.forms.criterion = this.form.valid;
    for (var field in this.dCandidateService.forms) {
      var valid = this.dCandidateService.forms[field];
      if (!valid) {
        Swal.fire({
          type: 'error',
          title: '...הטופס אינו תקין ',
          text: '! OK לתיקון הטופס לחץ על',
          footer: '      '
        })
        switch (field) {
          case 'person':
            this.router.navigate(['/detail-candidate/pro']);
            return;
          default:
            return;
        }
      }

    }
if(this.dCandidateService.allowAcceess==1)
    this.hagashatBakasha();
  }



  finishByMatcMaker() {
    this.submitAll() ;
    this.dCandidateService.finishCompliteDetails(this.cand).subscribe(res => {

      this.router.navigate(['/MatcMaker']);
    });



  }
}