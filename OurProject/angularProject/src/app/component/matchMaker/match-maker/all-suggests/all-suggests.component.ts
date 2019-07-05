import { Component, OnInit } from '@angular/core';
import { MatchmakerService } from 'src/app/Services/matchmaker.service';
import { Meeting } from 'src/app/models/meeting';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-all-suggests',
  templateUrl: './all-suggests.component.html',
  styleUrls: ['./all-suggests.component.css']
})
export class AllSuggestsComponent implements OnInit {
  AllMeeting: Meeting[];
  filterAllMeeting: Meeting[];
  tzGroom: string;
  tzBride: string;
  constructor(private MatchmakerService: MatchmakerService) { }

  ngOnInit() {
    this.getAllSuggests();
  }



  getAllSuggests() {
    this.MatchmakerService.GetAllSuggest().subscribe(res => {
      this.AllMeeting = res;
      alert(res);
    });
  }
  editMeeting(m) {//שמירת שינויים של פגישה
    this.MatchmakerService.EditMeeting(m).subscribe(res => {
      console.log(res);
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
  onkeyupMethod() {
    this.filterAllMeeting = this.AllMeeting;
    if (this.tzBride != null && this.tzBride != "")
      this.filterAllMeeting = this.filterAllMeeting.filter(p => p.tzBride.indexOf(this.tzBride) != -1);
    if (this.tzGroom != null && this.tzGroom != "")
      this.filterAllMeeting = this.filterAllMeeting.filter(p => p.tzGroom.indexOf(this.tzGroom) != -1);
    return this.filterAllMeeting;

  }

}
