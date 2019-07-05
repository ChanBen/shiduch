import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatchmakerService } from 'src/app/Services/matchmaker.service';
import { Timeouts } from 'selenium-webdriver';

@Component({
  selector: 'app-matchmaker-register',
  templateUrl: './matchmaker-register.component.html',
  styleUrls: ['./matchmaker-register.component.css']
})
export class MatchmakerRegisterComponent implements OnInit {

  constructor(private MatchmakerService: MatchmakerService) { }
  u: User = new User();
  isRegister: boolean = false;


  ngOnInit() {
  }



  submitRegisterMatchMaker() {
    this.MatchmakerService.registerMatchMaker(this.u).subscribe(data => {
      this.isRegister = true;
    },
      error => {
        console.log(error);
      });


  }



  saveDetailsMatchMaker() {//שמירת פרטי השדכן

    this.MatchmakerService.saveDetailsMatchMaker(this.u).subscribe(data => {
      console.log(data);

    },
      error => {
        console.log(error);
      });


  }


  editMatcMaker() {//עריכת פרטי השדכן


    this.MatchmakerService.GetDetailsMatchMaker(this.u).subscribe(data => {
      this.u = data;
      this.isRegister = true;
    },
      error => {
        console.log(error);
      });
  }
}
