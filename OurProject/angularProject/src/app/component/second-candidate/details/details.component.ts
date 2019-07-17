import { Component, OnInit } from '@angular/core';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { CandidateService } from 'src/app/Services/candidate.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { MigbalaCandidate } from 'src/app/models/migbala-candidate';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ReturnStatement } from '@angular/compiler';
import { saveAs as importedSaveAs } from "file-saver";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
//cand.Candidate.ImageCandidat
export class DetailsComponent implements OnInit {
  try = `Y:\group 1 תשעט\אטיק בתיה\OurProject\WebService\UploadFile\6587/ילד 1 copy.jpg`;
  cand: DetaileCandidate;
  constructor(public bsModalRef: BsModalRef, private dCandidateService: CandidateService, private router: Router) { }
  c: MigbalaCandidate;
  ngOnInit() {

    console.log(this.cand.Candidate.ImageCandidate)
    this.dCandidateService.cand=Object. assign({},  this.cand);

  }

  //   downloadImg(url: string) {
  //     this.downloadFile(url);
  //   }
  // // 
  downloadFile(urlImage: string) {
    window.open(urlImage);
    // importedSaveAs(blob, "this.fileName");
    // const url= window.URL.createObjectURL(blob);
    // window.open(url);
  }

  GetNameOfValue(id) {//מקבלת ID של קריטריון ומחזירה את הערך שהמועמד בחר 
    let x;
    let item = this.dCandidateService.cand.ValueListCandidate.find(p => p.CriteriaId == id && p.isSelf == true);
    if (!item)
      return null;
    x = item.ValueListId;
    return this.dCandidateService.GetValue(x);
  }
  getAgeFromDate(d: Date) {
    if (d == null)
      return null;
    let t = new Date(d);
    return new Date().getFullYear() - t.getFullYear();
  }

  GetNameOfSelfValue(id) {//מקבל קוד קריטרין ומחזיר את הערך המספרי של המועמד
    if (this.cand.ValueListCandidate.find(p => p.CriteriaId == id) != null)
      return this.cand.ValueListCandidate.find(p => p.CriteriaId == id).selfValue;
    return null;


  }
  GetNameOfSelfBool(b: boolean) {
  
    return b == true ? "כן" : "לא"

  }

  GetBoolFromValueList(id) {
    let b = this.cand.ValueListCandidate.find(p => p.CriteriaId == id);
    if (b)
      return this.GetNameOfSelfBool(b.selfBool);
    return null

  }

}
