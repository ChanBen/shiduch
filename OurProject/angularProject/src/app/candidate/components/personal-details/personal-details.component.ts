import { Component, OnInit } from '@angular/core';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { Parent } from 'src/app/models/parent';
import { Mechutanim } from 'src/app/models/mechutanim';
import { Children } from 'src/app/models/children';
import { CandidateService } from 'src/app/Services/candidate.service';
import { Criterion } from 'src/app/models/criterion';
import { Router } from '@angular/router';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent implements OnInit {

  selected: string;
  cand: DetaileCandidate;
  numChildren: number;
  numLanguage: number;
  numParents: number;
  numMechutanim: number;
  isParent: boolean;
  Islicense: boolean;
  isMechutanim: boolean;
  
  criteriondescription: Criterion[] = [];
  isChildren: boolean;
  criterionSector: Criterion[] = [];//מכיל קריטריונים השייכים רק לסקטור
  criterionLanguage: Criterion[] = [];//מכיל קריטריונים השייכים רק לשפות
  myValueList = [];//מכיל את רשימת הקרריטריונים שאותו בן אדם בחר בפעם שעברה

  constructor(public dCandidateService: CandidateService, public Router: Router) { }


  GetValueList(id) {//מחזיר את רשימת הערכים של קוד הקריטריון שקיבל כפרמטר

    return this.dCandidateService.GetValueList(id);
  }
  valueListID: number;

  GetIDListById(id) {//מחזיר את הערך שלו ע"פ קוד הערך הקריטריון שקיבל כפרמטר
    let x;
    let item = this.cand.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
    if (item)
      x = item.ValueListId;//מגיע לקוד הערך 
    return x;
  }

  GetValueListById(id) {//מחזיר את הערך ע"פ קוד הערך הקריטריון שקיבל כפרמטר
    let x
    const item = this.cand.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
    x = item.ValueListId
    return this.dCandidateService.arrValue.find(e => e.ValueListId == x).ValueListId;

  }

  init1() {

    this.cand = this.dCandidateService.currentCandidate;
    this.numChildren = this.cand.Children.length;
    this.numParents = this.cand.Parents.length;
    this.numMechutanim = this.cand.Mechutanim.length;
    this.isParent = this.cand.Parents.length != 0;
    this.isMechutanim = this.cand.Mechutanim.length != 0;
    if (this.cand.ValueListCandidate.length != 0) {
      this.numLanguage = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 29 && p.isSelf == true).length;
    }
    this.isChildren = this.cand.Children.length != 0;
    this.criterionSector = this.dCandidateService.criterionsArr.filter(r => r.category == 1);//מילוי קריטריוני סקטור
    this.criterionLanguage = this.dCandidateService.criterionsArr.filter(r => r.category == 2);//מילוי קריטריוני שפות

  }

  ngOnInit() {
    this.init1();
    
    this.dCandidateService.onLogined.subscribe(() => {
      this.init1();
    })

  }

  addChild() {

    let paar = this.cand.Children.length - this.numChildren;
    if (this.cand.Children.length > this.numChildren)
      this.cand.Children = this.cand.Children.splice(0, this.numChildren);
    else
      for (let i = 0; i < paar * -1; i++)
        this.cand.Children.push(new Children());
  }
  addParent() {
    let par = this.cand.Parents.length - this.numParents;
    if (this.cand.Parents.length > this.numParents)
      this.cand.Parents = this.cand.Parents.splice(0, this.numParents);
    else
      for (let i = 0; i < par * -1; i++)
        this.cand.Parents.push(new Parent());
  }
  addMechutanim() {
    let par = this.cand.Mechutanim.length - this.numMechutanim;
    if (this.cand.Mechutanim.length > this.numMechutanim)
      this.cand.Mechutanim = this.cand.Mechutanim.splice(0, this.numMechutanim);
    else
      for (let i = 0; i < par * -1; i++)
        this.cand.Mechutanim.push(new Mechutanim());
  }


  addLanguage() {

    let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 29 && P.isSelf == true).length - this.numLanguage;
    if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 29 && P.isSelf == true).length > this.numLanguage)
      this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 29).splice(0, this.numLanguage);
    else
      for (let i = 0; i < paar * -1; i++) {

        var currntValueList = new ValueListCandidate();

        currntValueList.CriteriaId = 29;
        currntValueList.isSelf = true;
        this.cand.ValueListCandidate.push(currntValueList);
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

    this.Router.navigate(['/detail-candidate/desc']);
  }
  
 


  f(tz){
    console.log(tz);
  }
}