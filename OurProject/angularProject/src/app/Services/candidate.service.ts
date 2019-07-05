import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetaileCandidate } from '../models/detaile-candidate';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from '../register/register.component';
import { User } from '../models/user';
import 'rxjs';
import { Observable, Subject } from "rxjs";
import { Criterion } from '../models/criterion';
import { ValueList } from "../models/value-list";
import { ValueListCandidate } from '../models/value-list-candidate';
import { map } from 'rxjs/operators';

// import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {


  currentCandidate = new DetaileCandidate();
  secondCandidate = new DetaileCandidate();
  allowAcceess: number;
  onLogined = new Subject();
  arrValue: ValueList[] = [];//מכיל את כל רשימת הערכים
  criterionsArr: Criterion[] = [];//מכיל את כל הקריטריונים
  image: FormData;

  // AppUrl:string='http://localhost/'


  constructor(private http: HttpClient) {
    this.getCr();
  }

  //id=idשל רשימת ערכים
  //crit=לקריטריון הנוכחי
  //ברגע שמשנה ערך של קריטריון
  changeValue(crit: number, id: any) {
    if (this.currentCandidate.ValueListCandidate.find(p => p.CriteriaId == crit) == null) {
      var currntValueList = new ValueListCandidate();
      currntValueList.ValueListId = id;//id.currentTarget.value;
      currntValueList.CriteriaId = crit;
      currntValueList.isSelf = true;
      this.currentCandidate.ValueListCandidate.push(currntValueList);
    }
    else {
      this.currentCandidate.ValueListCandidate.find(p => p.CriteriaId == crit).ValueListId = id;//.currentTarget.value;
    }
  }
  getCritMoreLanguage(numCrit: number) {//מתאים גם לשאר הקריטריונים

    let res = this.currentCandidate.ValueListCandidate.filter(p => p.CriteriaId == numCrit && p.isSelf == true);
    return res;
  }
  GetValueList(id) {//מחזיר את רשימת הערכים של קוד הקריטריון שקיבל כפרמטר
    if (id === 29) {
      id = 28;
    }
    let a = this.arrValue.filter(e => e.CriterionId == id);
    return a;
  }

  GetValue(id) {//מקבל ID ומחזיר את הערך שלו

    let a = this.arrValue.find(e => e.ValueListId == id);
    return a.Value;
  }

  GetIDListById(id) {//מחזיר את הערך שלו ע"פ קוד הערך הקריטריון שקיבל כפרמטר
    let x;
    let item = this.currentCandidate.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
    if (item)
      x = item.ValueListId;//מגיע לקוד הערך 
    return x;
  }

  GetValueListById(id) {//מחזיר את הערך ע"פ קוד הערך הקריטריון שקיבל כפרמטר
    let x
    const item = this.currentCandidate.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
    x = item.ValueListId
    return this.arrValue.find(e => e.ValueListId == x).ValueListId;

  }

  getCr() {
    this.http.get(environment.api + '/DetailsCandidate').subscribe(res => {
      console.log(res);
    })

  }

  //יוצר משתמש חדש -שם משתמש וסיסמה
  Register(user: User) {
    return this.http.post(environment.api + '/register', user);
  }

  //אם הכן המשתמש קיים מחזיר את כל פרטיו
  login(u: User): Observable<DetaileCandidate> {
    return this.http.post<DetaileCandidate>(environment.api + '/loginCandidate/', u)
      .pipe(map(res => {
        this.currentCandidate = res;
        this.allowAcceess = res.User.AllowAccess;
        this.onLogined.next();
        return res
      }));
    // return this.http.get(environment.api + '/loginCandidate?username=' + user.UserName + '&password=' + user.Password)
    // .pipe(map(res => this.currentCandidate = res));
  }

  //שולח את כל נתוני המועמד לשמירה

  saveDetailCandidate(detailCandidate: DetaileCandidate) {
    return this.http.post(environment.api + '/saveDetailsCandidate', detailCandidate)
  }



  //מחזיר את כל הקריטריונים
  getCriteria() {
    return this.http.get<Criterion[]>(environment.api + '/GetCriteria')
  }

  //מחזיר את רשימת ערכים
  getAllValueList() {

    return this.http.get<ValueList[]>(environment.api + '/getValueList')

  }

  //סיום השלמת פרטי מועמד
  finishCompliteDetails(detailCandidate: DetaileCandidate) {
    return this.http.post(environment.api + '/finishCompliteDetails', detailCandidate)
  }


  //הבאת פרטי המועמד ע"י ת.ז.
  GetDetailsByTz(u: User): Observable<DetaileCandidate> {

    return this.http.post<DetaileCandidate>(environment.api + '/GetDetailsByTz/', u)
      .pipe(map(res => {
        this.currentCandidate = res;
        this.onLogined.next();
        return res;
      }));

  }
  onlyGetDetailsByTz(u: User): Observable<DetaileCandidate> {

    return this.http.post<DetaileCandidate>(environment.api + '/GetDetailsByTz/', u)

  }




uploadFile(data: any, id: string): any {
  return this.http.post(environment.api + '/UploadFile?id=' + id, data);

}
UploadDoc(data: any, id: string): any {
  return this.http.post(environment.api + '/UploadDoc?id=' + id, data);

}



//   detailsCandidate:DetaileCandidate;
// //הבאת פרטי מועמד ע"י ת.ז. מיעד לכפתור פרטים בכרטיסית ההצעות
//   GetDetailsByTzToSuggests(u: User): Observable<DetaileCandidate> {

//     return this.http.post<DetaileCandidate>(environment.api + '/GetDetailsByTz/', u)
//       .pipe(map(res => {
//         var respon=res;
//         return respon;
//       }));

//   }


//מחזיר את ההרשאת גישה של המשתמש
GetAllowAccess(u: User) {

  return this.http.post(environment.api + '/GetAllowAccess', u)
}

hagashatBakasha(detailCandidate: DetaileCandidate) {// c sharp פונקצית הגשת בקשה  שליחת מייל לשדכן לקביעת פגישה וכן שמירת פרטיו ב
  return this.http.post(environment.api + '/hagashatBakasha', detailCandidate)
}

postFileUpLoad(data: any, id): any {
  return this.http.post('http://localhost:62698/uploadeFile?id=' + id, data);
}

}
