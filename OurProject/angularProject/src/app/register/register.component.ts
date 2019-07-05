import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CandidateService } from '../Services/candidate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    
  }

  hasErr = false;
  
  constructor(private candidateService:CandidateService, private router: Router) { }
  u:User=new User();
  submitregisterForm() {
  
    this.hasErr = false;
    this.candidateService.Register(this.u).subscribe( data => {
      // Processing for successfull response
      this.candidateService.currentCandidate.User = this.u;
      this.candidateService.allowAcceess=1;
      this.router.navigate(['/detail-candidate']);
    },
    error => {
      this.hasErr = true;
     console.log(error);
    });

 
  }
}
