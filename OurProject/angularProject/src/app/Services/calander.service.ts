import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Meeting } from '../models/meeting';

@Injectable({
  providedIn: 'root'
})
export class CalanderService {

  constructor(private http: HttpClient) { }

  getAllMeeying() {//מחזיר את כל הפגישות

    return this.http .get<Meeting[]>(environment.api + '/GetAllMeeting');
    
  }
  GetMeetingByTz(tz:string) {// מחזיר את כל הפגישות של משתמש מסוים

    return this.http .get<Meeting[]>(environment.api + '/GetMeetingByTz?tz='+tz);
    
  }
  GetMeetingMatcMaker() {// מחזיר את כל הפגישות עם שדכנים

    return this.http .get<Meeting[]>(environment.api + '/GetMeetingMatcMaker');
    
  }
  addMeeting(m:Meeting) {// מוסיף פגישה למסד נתונים

    return this.http .post(environment.api + '/addMeeting',m);
    
  }

  deleteMeeting(m:Meeting) {

    return this.http .post(environment.api + '/deleteMeeting',m);
    
  }
  EditMeeting(m:Meeting) {

    return this.http .post(environment.api + '/EditCalendarMeeting',m);
    
  }
  

}
