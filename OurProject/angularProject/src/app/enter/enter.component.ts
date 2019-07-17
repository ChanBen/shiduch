import { Component, OnInit } from '@angular/core';
import { DetaileCandidate } from '../models/detaile-candidate';
import { User } from '../models/user';
import { CandidateService } from '../Services/candidate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {
  hasErorr: boolean;
  constructor(private dCandidateService: CandidateService, private router: Router) { }

  ngOnInit() {
    this.hasErorr = false;
  }
  u: User = new User();
  // cand: DetaileCandidate = new DetaileCandidate(new User(),
  //   new Candidate(), [new Children()],
  //   [new Parent()], [new Mechutanim()], [new CriteronCandidate()], [new Docs()],
  //   [new Hospitalizition()], [new MigbalaCandidate()])


  submitloginForm() {

    this.hasErorr = false;

    this.dCandidateService.GetDetailsByUserId(this.u).subscribe((r: DetaileCandidate) => {

      if (this.dCandidateService.allowAcceess == 1) {

        let enterIn = this.dCandidateService.cand.Candidate.EnterIn;

        if (!this.dCandidateService.cand.Candidate || enterIn == 1)
          this.router.navigate(['/detail-candidate']);

        if (enterIn == 2) {
          this.router.navigate(['/second-candidate']);
        }

        if (enterIn == 3) {
          alert("כבר התארסת!!")
        };

      } else {
        if (this.dCandidateService.allowAcceess == 2 || this.dCandidateService.allowAcceess == 3) {
          this.router.navigate(['/MatcMaker']);
        }
      }
    }, error => { });
  }


  // localStorage.setItem("allowAccess", btoa(res.toString()));

  // this.dCandidateService.login(this.u).subscribe((res: any) => {
  //   alert(res);
  //   localStorage.setItem("user", this.u.UserName);
  //   localStorage.setItem("pas", this.u.Password);
  //   this.dCandidateService.cand = res;
  //   this.dCandidateService.allowAcceess = res.User.allowAcceess;
  //   this.router.navigate(['/detail-candidate']);
  //   alert(res);
  // });





}

