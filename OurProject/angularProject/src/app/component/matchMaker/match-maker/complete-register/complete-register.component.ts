import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-register',
  templateUrl: './complete-register.component.html',
  styleUrls: ['./complete-register.component.css']
})
export class CompleteRegisterComponent implements OnInit {

  constructor(private dCandidateService: CandidateService, private router: Router) { }
  u: User = new User();



  ngOnInit() {
  }


  Onsubmit() {


    this.dCandidateService.GetDetailsByTz(this.u).subscribe((res: any) => {
      alert("res");
      this.dCandidateService.currentCandidate = res;
      this.router.navigate(['/detail-candidate']);

    });


  }

}



