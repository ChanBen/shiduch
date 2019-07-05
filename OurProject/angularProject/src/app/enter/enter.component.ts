import { Component, OnInit } from '@angular/core';
import { DetaileCandidate } from '../models/detaile-candidate';
import { User } from '../models/user';
import { Candidate } from '../models/candidate';
import { Children } from '../models/children';
import { Parent } from '../models/parent';
import { Mechutanim } from '../models/mechutanim';

import { Docs } from '../models/docs';
import { Hospitalizition } from '../models/hospitalizition';
import { MigbalaCandidate } from '../models/migbala-candidate';
import { CandidateService } from '../Services/candidate.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {

  constructor(private dCandidateService: CandidateService, private router: Router) { }

  ngOnInit() {

  }
  u: User = new User();
  // cand: DetaileCandidate = new DetaileCandidate(new User(),
  //   new Candidate(), [new Children()],
  //   [new Parent()], [new Mechutanim()], [new CriteronCandidate()], [new Docs()],
  //   [new Hospitalizition()], [new MigbalaCandidate()])


  submitloginForm() {

    this.dCandidateService.GetAllowAccess(this.u).subscribe((res: number) => {
      this.dCandidateService.allowAcceess = res;


      if (this.dCandidateService.allowAcceess == 1) {
        this.dCandidateService.login(this.u).subscribe((res: any) => {
          alert(res);
          localStorage.setItem("user", this.u.UserName);
          localStorage.setItem("pas", this.u.Password);
          this.dCandidateService.currentCandidate = res;
          if (this.dCandidateService.currentCandidate.Candidate == null || this.dCandidateService.currentCandidate.Candidate.EnterIn == 1)
            this.router.navigate(['/detail-candidate']);
          if (this.dCandidateService.currentCandidate.Candidate.EnterIn == 2) {
            this.router.navigate(['/second-candidate']);
            this.dCandidateService.secondCandidate = res;
          }
          alert(res);
        }, error => {
          console.log(error);
        });
      }
      if (this.dCandidateService.allowAcceess == 2) {
        this.router.navigate(['/MatcMaker']);
      }

    });



    // this.dCandidateService.login(this.u).subscribe((res: any) => {
    //   alert(res);
    //   localStorage.setItem("user", this.u.UserName);
    //   localStorage.setItem("pas", this.u.Password);
    //   this.dCandidateService.currentCandidate = res;
    //   this.dCandidateService.allowAcceess = res.User.allowAcceess;
    //   this.router.navigate(['/detail-candidate']);
    //   alert(res);
    // });


  }



}

