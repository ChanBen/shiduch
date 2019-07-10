import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { CandidateService } from 'src/app/Services/candidate.service';
import { SecondCandidateService } from 'src/app/Services/second-candidate.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetailsComponent } from '../details/details.component';


@Component({
  selector: 'app-suggests',
  templateUrl: './suggests.component.html',
  styleUrls: ['./suggests.component.css']
})
export class SuggestsComponent implements OnInit {
  arrUser: User[];
  cand: DetaileCandidate;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private SeconedUserServ:SecondCandidateService, private dCandidateService: CandidateService,private router:Router) { }

  ngOnInit() {
    // this.cand = this.dCandidateService.currentCandidate;
    this.SeconedUserServ.GetListUserOfSuggestByTz(this.dCandidateService.currentCandidate.User.Tz).subscribe((res) => {
      this.arrUser = res;

    });
  }
  submitForm() {
   
    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });

  }


    getAgeFromDate(d:Date)
    {
  
    let t=new Date(d);
      return new Date().getFullYear()-t.getFullYear();
    }

  Interested(user:User,tz:string){

    this.SeconedUserServ.Interested(user,tz).subscribe(res => {
      alert(res);
  

    });


  }


  NotInterseted(user:User,tz:string){
    this.SeconedUserServ.NotInterested(user,tz).subscribe(res => {
      alert(res);
    });
  }
  
  GetDetailByTzToSuggestion(user:User){//בלחיצה על פרטים
    this.dCandidateService.GetDetailsByTz(user).subscribe(res=>{
      this.openModalWithComponent(res);

    })
   
    // this.router.navigate(['/details']);
  }


  openModalWithComponent(res) {//פותח מודל המביא את פרטי המועמד
    const initialState = {
      cand: res,
    };
    this.bsModalRef = this.modalService.show(DetailsComponent, Object.assign( { initialState },  { class: 'modal-lg' }));
    
  }
}
