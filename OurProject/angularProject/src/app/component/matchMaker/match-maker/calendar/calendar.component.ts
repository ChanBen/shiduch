import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NewMeetingComponent } from './new-meeting/new-meeting.component';
import { CalanderService } from 'src/app/Services/calander.service';
import { Meeting } from 'src/app/models/meeting';
import { removeElement } from '@fullcalendar/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  Tz: string;
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private CalanderService: CalanderService) { }
  // ngOnInit() {
  //   this.CalanderService.getAllMeeying().subscribe(res => {
  //     this.calendarEvents = res;
  //     alert(res);
  //   });
  // }

  @ViewChild('calendar', { static: false }) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: Meeting[] = [];
  // = [
  //   {
  //     title: 'Event Now', start: new Date(), borderColor: 'red',
  //     startEditable: true,
  //     durationEditable: true,
  //   }
  // ];



  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  gotoPast() {
    let calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate('2000-01-01'); // call a method on the Calendar object
  }

  handleEventeClick(arg) {//לחיצה על אירוע
    // for(let item of this.calendarEvents ){
    //   let a=new Date(item.start);
    //   if(a.getTime()==arg.event.start.getTime())
    //   console.log("ghdh");
    // }
    console.log(this.calendarEvents);
    let m: Meeting = this.calendarEvents.find(p => new Date(p.start).getTime() == arg.event.start.getTime() && new Date(p.end).getTime() == arg.event.end.getTime());
    this.openModalWithComponent(2, m)
    // arg.event
  }

  handleDateClick(arg) {//לחיצה על תאריך מסוים
    if (new Date(arg.date) > new Date()) {
      this.openModalWithComponent(1, new Meeting(), new Date(arg.date))

      // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      //   this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
      //     title: 'New Event',
      //     start: arg.date,
      //     borderColor: 'yellow',
      //     startEditable: true,
      //     durationEditable: true,
      //     // allDay: arg.allDay
      //   })
      // }
    }
  }

  openModalWithComponent(kind, meeting?: Meeting, date?: Date) {//בלחיצה על ארוע מסוים מראה את פרטיו
    const initialState = {
      date: date,
      kind: kind,
      m: meeting,
      // title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(NewMeetingComponent, { initialState });
    this.bsModalRef.content.meetingChanged.subscribe((newMeeting: any) => {
      if (newMeeting == null) {
        const eventIndex = this.calendarEvents.indexOf(meeting);

        let calendarEvents = this.calendarEvents.slice(); // a clone
        calendarEvents.splice(eventIndex, 1);
        this.calendarEvents = calendarEvents; // reassign the array
        /*    this.calendarEvents = [];
           this.calendarEvents = test;
           debugger
           let calendarApi = this.calendarComponent.getApi(); 
           calendarApi.next(); */
      }


      else {
        if (this.calendarEvents.find(p => p.MeetingId == newMeeting.MeetingId) != null) {

          let eventIndex = this.calendarEvents.indexOf(newMeeting);
          let calendarEvents = this.calendarEvents.slice(); // a clone
          let singleEvent = JSON.parse(JSON.stringify(newMeeting)); // a clone
          calendarEvents[eventIndex] = singleEvent;
          this.calendarEvents = calendarEvents; // reassign the array
        } else {

          this.calendarEvents = this.calendarEvents.concat(newMeeting);
        }
      }
      this.bsModalRef.hide();

    });
  }

  //======= my function ====================
  GetMeetingByTz() {

    this.CalanderService.GetMeetingByTz(this.Tz).subscribe(res => {
      this.calendarEvents = res;
    });
  }
  GetMeetingMatcMaker() {
   
    this.CalanderService.GetMeetingMatcMaker().subscribe(res => {
      this.calendarEvents = res;


      res.forEach(element => {
        element.start= new Date(element.start.toString().split("Z")[0]);
        element.end= new Date(element.end.toString().split("Z")[0]);
     
      });
    });


  }

}
