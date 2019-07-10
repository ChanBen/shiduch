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
  kind: number;//ז"א שזו פגישה חדשה
  start: string;
  end: string;

  meetingChanged = new Subject();
  m: Meeting;

  constructor(public bsModalRef: BsModalRef, private CalanderService: CalanderService) { }

  ngOnInit() {
    if (this.kind == 1) {
      this.m = new Meeting()
      this.m.KindMeeting = 1;
      this.m.title = "פגישה עם שדכן "
      this.m.backgroundColor = "red";
    }
    else {

    this.start=  this.m.start.toString().split(" ")[4];
    this.end=  this.m.end.toString().split(" ")[4];
      // this.start = this.m.start.toString().split(/T|Z/)[1];
      // this.end = this.m.end.toString().split(/T|Z/)[1];

    }



  }

  addMeeting() {

    let arr = this.start.split(":")
    this.date.setHours(Number(arr[0]) + 3);

    this.date.setMinutes(Number(arr[1]));
    this.m.start = this.date;
    arr = this.end.split(":");
    let d: Date;
    d = new Date(this.date);
    d.setHours(Number(arr[0]) + 3);
    d.setMinutes(Number(arr[1]));
    this.m.end = d;
    if (this.m.KindMeeting == 1) {
      this.m.title = "פגישה בין מועמדים ";
      this.m.backgroundColor = "green";
    }
    this.CalanderService.addMeeting(this.m).subscribe((res:Meeting) => {
      console.log(res);
      res.start= new Date(res.start.toString().split("Z")[0]);
      res.end= new Date(res.end.toString().split("Z")[0]);
      this.meetingChanged.next(res);
    });

  }
  EditMeeting() {
    this.date = new Date(this.m.start);
    let arr = this.start.split(":")
    this.date.setHours(Number(arr[0]) + 3);

    this.date.setMinutes(Number(arr[1]));
    this.m.start = this.date;
    arr = this.end.split(":");
    let d: Date;
    d = new Date(this.date);
    d.setHours(Number(arr[0]) + 3);
    d.setMinutes(Number(arr[1]));
    this.m.end = d;
    if (this.m.KindMeeting == 1) {
      this.m.title = "פגישה בין מועמדים ";
      this.m.backgroundColor = "green";
    }
    else {
      this.m.title = "פגישה עם שדכן ";
      this.m.backgroundColor = "red";
    }
    this.CalanderService.EditMeeting(this.m).subscribe((res :Meeting)=> {
      console.log(res);

      res.start= new Date(res.start.toString().split("Z")[0]);
      res.end= new Date(res.end.toString().split("Z")[0]);

      this.meetingChanged.next(res);
    });
  }
  // res.start= new Date(res.start.toString().split("Z")[0]);
  // res.end= new Date(res.end.toString().split("Z")[0]);

  // this.meetingChanged.next(res);
  deleteMeeting() {

    this.CalanderService.deleteMeeting(this.m).subscribe(res => {
      console.log(res);
      this.meetingChanged.next(null);

    });


  }

}
