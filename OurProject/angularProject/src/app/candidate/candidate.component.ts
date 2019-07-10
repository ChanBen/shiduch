import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../Services/candidate.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { DetaileCandidate } from '../models/detaile-candidate';


@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {
  user: User = new User();
  cand: DetaileCandidate;
  constructor(private dCandidateService: CandidateService, private router: Router) { }
  ngOnInit() {
    this.cand = this.dCandidateService.currentCandidate;
    // let username = localStorage.getItem("user");
    // let password = localStorage.getItem("pas");

    // this.user.Password = password;
    // this.user.UserName = username;

    //  if (username && password) {
    //   this.dCandidateService.login(this.dCandidateService.currentCandidate.User).subscribe((res: any) => {
    //  });
    // }
    this.getValueList();
    this.getCriteria();
  }

  getValueList() {
    this.dCandidateService.getAllValueList().subscribe((res) => {
      this.dCandidateService.arrValue = res;
    }, (err) => {

    });
  }

  getCriteria() {
    this.dCandidateService.getCriteria().subscribe((res) => {
      console.log(res); console.log("succes");
      this.dCandidateService.criterionsArr = res;
    }, (err) => { console.log(err); alert(err); });

  }


  // saveDetailCandidate() {//שומר את פרטי המועמד

  //   if (this.dCandidateService.allowAcceess == 1) {
  //     this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
  //       alert(res);
  //     });

  //   }
  //   else if (this.dCandidateService.allowAcceess == 2) {
  //     this.dCandidateService.finishCompliteDetails(this.cand).subscribe(res => {
  //       alert(res);
  //       this.router.navigate(['/MatcMaker']);
  //     });
  //   }
  // }
  // hagashatBakasha() {// c sharp פונקצית הגשת בקשה  שליחת מייל לשדכן לקביעת פגישה וכן שמירת פרטיו ב
  //   this.dCandidateService.hagashatBakasha(this.cand).subscribe(res => {
  //     alert(res);
  //   });
  // }

  // saveAndContinue() {//שומר את פרטי המועמד וממשיך לתאב הבא
  //   this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
  //     alert(res);
  //   });

  //   //setActivePage('products')
  //   // this.router.navigate(['desc'], {relativeTo: this.activatedRoute});
  //   this.router.navigate(['/'])
  // }
}
