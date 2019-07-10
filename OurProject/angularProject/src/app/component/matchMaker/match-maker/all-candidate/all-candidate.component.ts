import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatchmakerService } from 'src/app/Services/matchmaker.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DetailsComponent } from 'src/app/component/second-candidate/details/details.component';
@Component({
  selector: 'app-all-candidate',
  templateUrl: './all-candidate.component.html',
  styleUrls: ['./all-candidate.component.css']
})
export class AllCandidateComponent implements OnInit {

  AllCandidate: User[];
  filterAllCandidate: User[];
  tz: string;
  LastName: string
  Gender: number;
  city:string;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService,private MatchmakerService: MatchmakerService) { }

  ngOnInit() {
    this.getAllCandidate();
  }



  getAllCandidate() {
    this.MatchmakerService.getAllCandidate().subscribe(res => {
      this.AllCandidate = res;
      alert(res);
    });
  }

  Details(tz)//מפנה למודל של המראה את פרטי המועמד ע"פ הת.ז.
  {
    let u = new User();;
    u.Tz = tz;
    this.MatchmakerService.GetDetailsByTz(u).subscribe(res => {
      console.log(res);
    });
  }
  onkeyupMethod() {//מחזיר את הרשימה המסוננת
    this.filterAllCandidate = this.AllCandidate;
    if (this.tz != null && this.tz != "")
      this.filterAllCandidate = this.filterAllCandidate.filter(p => p.Tz && p.Tz.indexOf(this.tz) != -1);
    if (this.LastName != null && this.LastName != "")
      this.filterAllCandidate = this.filterAllCandidate.filter(p => p.LastName && p.LastName.indexOf(this.LastName) != -1);
    if (this.Gender != null&&this.Gender != 3)
    this.filterAllCandidate = this.filterAllCandidate .filter(p => p.Gender == true && this.Gender == 1 || p.Gender == false && this.Gender == 2);
    
    if (this.city != null && this.city != "")
    this.filterAllCandidate = this.filterAllCandidate.filter(p => p.CityId && p.CityId.indexOf(this.city) != -1);
    return this.filterAllCandidate ;

  }


  getGender(b: boolean) {
    return b == true ? "זכר" : "נקבה"

  }


  openModalWithComponent(tz) {//פותח מודל המביא את פרטי המועמד
    let u = new User();;
    u.Tz = tz;
    this.MatchmakerService.GetDetailsByTz(u).subscribe(res => {
      console.log(res);
      const initialState = {
        cand: res,
      };
      this.bsModalRef = this.modalService.show(DetailsComponent, { initialState });
      
    });
   
  }

}
