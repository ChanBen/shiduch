import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { CandidateService } from '../Services/candidate.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isFirst: Number;
  ngOnInit(): void {
    this.isFirst = 1;

  }
  validPassword: string;
  validUserName: string;

  constructor(private candidateService: CandidateService, private router: Router) { }
  u: User = new User();
  submitregisterForm() {
    this.isFirst = 2
    this.validPassword = null;
    this.validUserName = null;
    if (this.validate(this.u.UserName, this.u.Password)) {
     
      this.candidateService.Register(this.u).subscribe((data: string) => {
        localStorage.setItem("userId", data);
        this.u.UserId = Number(data);

        this.candidateService.cand.User = this.u;
        this.candidateService.allowAcceess = 1;
        this.candidateService.firstRegister = "1";
        this.router.navigate(['/detail-candidate']);
      },
        error => {
          this.validUserName = "שם משתמש תפוס שנה שם*"
        });
    }

  }


  validate(userName: string, password: string): boolean {
    this.validPassword = null;
    this.validUserName = null;
    if (this.isFirst == 1)
      return;
    if (password == null || password == "") { this.validPassword = "שדה חובה*"; if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != "")) return false }
    if (userName == null || userName == "") { this.validUserName = "שדה חובה*"; if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != "")) return false }
    if (userName.indexOf(password) != -1 || password.indexOf(userName) != -1) { this.validPassword = "שם משתמש וסיסמה דומים*";if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != "")) return false }
    if (password.length < 8) {
    
      this.validPassword = "הסיסמה צריכה להכיל לפחות 8 תוים";
      if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != ""))
       return false;
    }
    if (userName.length < 4) { this.validUserName = "שם משתמש צריך להכיל לפחות 4 תוים"; if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != "")) return false }
    for (let i = 0; i < userName.length - 2; i++)
      if (userName[i] == userName[i + 1] && userName[i] == userName[i + 2]) { this.validUserName = "שם משתמש מכיל 3 או יותר תוים ברצף*"; if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != "")) return false }
    for (let i = 0; i < password.length - 2; i++)
      if (password[i] == password[i + 1] && password[i] == password[i + 2]) { this.validPassword = "הסיסמה מכילה 3 או יותר תוים ברצף*"; if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != "")) return false }
    if (password.match(/[0-9]/i) && password.match(/[a-z]/i) == null) { this.validPassword = "הסיסמה  צריכה להכיל שילוב של מספרים ואותיות*"; if ((this.validPassword != null && this.validPassword != "") && (this.validUserName != null && this.validUserName != "")) return false }
    if ((this.validPassword != null && this.validPassword != "") || (this.validUserName != null && this.validUserName != ""))
      return false;
    return true;

  }
}
