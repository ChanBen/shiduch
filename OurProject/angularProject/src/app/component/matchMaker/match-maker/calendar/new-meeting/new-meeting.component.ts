import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Meeting } from 'src/app/models/meeting';
import { CalanderService } from 'src/app/Services/calander.service';
import { Time } from '@angular/common';
import { dateSelectionJoinTransformer } from '@fullcalendar/core';

@Component({
  selector: 'app-new-meeting',
  templateUrl: './new-meeting.component.html',
  styleUrls: ['./new-meeting.component.css']
})
export class NewMeetingComponent implements OnInit {
  // המשתנה king יכיל :
  //1-בהוספת פגישה
  //2-בעריכת פגישה
  date: Date;
  kind: number;
  start: string;
  end: string;

  meetingChanged = new Subject();
  m: Meeting;

  constructor(public bsModalRef: BsModalRef, private CalanderService: CalanderService) { }

  ngOnInit() {
    if (this.kind == 1) {
      this.m = new Meeting()
      this.m.KindMeeting = 1;
    }
    else {

      this.start
      this.start = this.m.start.toString().split(/T|Z/)[1];
      this.end = this.m.end.toString().split(/T|Z/)[1];

    }



  }

  addMeeting() {

    let arr = this.start.split(":")
    this.date.setHours(Number(arr[0])+3);

    this.date.setMinutes(Number(arr[1]));
    this.m.start = this.date;
    arr = this.end.split(":");
   let d:Date;
    d=new Date( this.date);
    d.setHours(Number(arr[0])+3);
    d.setMinutes(Number(arr[1]));
    this.m.end = d;

    this.CalanderService.addMeeting(this.m).subscribe(res => {
      console.log(res);
      this.meetingChanged.next(res);
    });
   
  }
  EditMeeting(){
    this.CalanderService.EditMeeting(this.m).subscribe(res => {
      console.log(res);
      this.meetingChanged.next(res);
      
    });


  }

  deleteMeeting(){
    this.CalanderService.deleteMeeting(this.m).subscribe(res => {
      console.log(res);
      this.meetingChanged.next(null);
      
    });


  }

}
