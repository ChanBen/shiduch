import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { CandidateService } from 'src/app/Services/candidate.service';
import { SecondCandidateService } from 'src/app/Services/second-candidate.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetailsComponent } from '../details/details.component';
import { UserToSuggest } from 'src/app/models/user-to-suggest';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-suggests',
  templateUrl: './suggests.component.html',
  styleUrls: ['./suggests.component.css']
})
export class SuggestsComponent implements OnInit {
  arrUser: UserToSuggest[];
  cand: DetaileCandidate;
  bsModalRef: BsModalRef;
  u: User;
  constructor(private modalService: BsModalService, private SeconedUserServ: SecondCandidateService, private dCandidateService: CandidateService, private router: Router) { }

  ngOnInit() {

    // this.cand = this.dCandidateService.cand;
    if (this.dCandidateService.secondCandidate.User.UserId == null) {
    this.u = new User();
      this.u.UserId = Number(localStorage.getItem("userId"));
      this.dCandidateService.GetDetailsByUserId(this.u).subscribe(res => {
        this.dCandidateService.secondCandidate = res
        this.dCandidateService.allowAcceess = res.User.AllowAccess;
        this.SeconedUserServ.GetListUserOfSuggestByTz(this.dCandidateService.secondCandidate.User.Tz).subscribe((res) => {
          this.arrUser = res;
        });
      });
    }
    else {
      this.SeconedUserServ.GetListUserOfSuggestByTz(this.dCandidateService.secondCandidate.User.Tz).subscribe((res) => {
        this.arrUser = res;

      })
    }
  }
  submitForm() {

    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });

  }


  getAgeFromDate(d: Date) {

    let t = new Date(d);
    return new Date().getFullYear() - t.getFullYear();
  }

  Interested(user: User, tz: string) {
    Swal.fire(
    {
        text: 'בעזרת ד" בקרוב שדכן יצור יתך קשר לצורך המשך התהליך הרבה הצלחות!!',
        confirmButtonText: 'אישור!',
    }
      )
    this.SeconedUserServ.Interested(user, tz).subscribe(res => {
      alert(res);


    });


  }


  NotInterseted(user: User, tz: string) {


    Swal.fire({
      title: 'האם אתה בטוח ?',
      text: "אתה מעונין להסיר הצעה זאת לצמיתות!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן,הסר!',
      cancelButtonText: 'בסוף לא...!',
    }).then((result) => {
      if (result.value) {
        this.arrUser.splice(this.arrUser.indexOf(this.arrUser.find(p=>p.user.Tz==tz)),1);
        this.SeconedUserServ.NotInterested(user, tz).subscribe(res => {
          alert(res);
        });
      }
    })


    
  }

  GetDetailByTzToSuggestion(user: User) {//בלחיצה על פרטים
    this.dCandidateService.GetDetailsByTz(user).subscribe(res => {
      this.openModalWithComponent(res);

    })

    // this.router.navigate(['/details']);
  }


  openModalWithComponent(res) {//פותח מודל המביא את פרטי המועמד
    const initialState = {
      cand: res,
    };
    this.bsModalRef = this.modalService.show(DetailsComponent, Object.assign({ initialState }, { class: 'modal-lg' }));

  }
}
