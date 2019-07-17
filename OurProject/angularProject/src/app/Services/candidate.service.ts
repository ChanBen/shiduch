import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetaileCandidate } from '../models/detaile-candidate';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import 'rxjs';
import { Observable, Subject } from "rxjs";
import { Criterion } from '../models/criterion';
import { ValueList } from "../models/value-list";
import { map } from 'rxjs/operators';


// import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {


  firstRegister: string;
  cand = new DetaileCandidate();
  secondCandidate = new DetaileCandidate();
  manager = new User();
  allowAcceess: number;
  onLogined = new Subject();
  arrValue: ValueList[] = [];//מכיל את כל רשימת הערכים
  criterionsArr: Criterion[] = [];//מכיל את כל הקריטריונים
  image: FormData;
  obs: Subject<any> = new Subject();
  public forms = { criterion: null, person: null };
  // AppUrl:string='http://localhost/'


  constructor(private http: HttpClient) {
    this.getCr();
  }

  getCand(): Observable<DetaileCandidate> {
    let userId = localStorage.getItem("userId");

    if (userId) {
      let u: User = new User();
      u.UserId = Number(userId);

      return this.GetDetailsByUserId(u).pipe(map(
        (res: DetaileCandidate) => {
          res.User.BornDate = new Date(res.User.BornDate);
          return res;
        }))
    }

    return null;
  }

  getCritMoreLanguage(numCrit: number) {//מתאים גם לשאר הקריטריונים

    let res = this.cand.ValueListCandidate.filter(p => p.CriteriaId == numCrit && p.isSelf == true);
    if (res == null || res.length == 0)
      return null;
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
    let item = this.cand.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
    if (item)
      x = item.ValueListId;//מגיע לקוד הערך 
    return x;
  }

  GetValueListById(id) {//מחזיר את הערך ע"פ קוד הערך הקריטריון שקיבל כפרמטר
    let x
    const item = this.cand.ValueListCandidate.find(p => p.CriteriaId == id);//מגיע לקוד הערך 
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
        this.cand = res;
        this.allowAcceess = res.User.AllowAccess;
        this.onLogined.next();
        return res
      }));
    // return this.http.get(environment.api + '/loginCandidate?username=' + user.UserName + '&password=' + user.Password)
    // .pipe(map(res => this.cand = res));
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
        this.cand = res;
        this.onLogined.next();
        return res;
      }));

  }
  //הבאת פרטי המועמד ע"י userId.
  GetDetailsByUserId(u: User): Observable<DetaileCandidate> {

    return this.http.post<DetaileCandidate>(environment.api + '/GetDetailsByUserId/', u).
      pipe(map((res: DetaileCandidate) => {
        if (this.allowAcceess != 2 && this.allowAcceess != 3)
          this.allowAcceess = res.User.AllowAccess;
        localStorage.setItem("userId", res.User.UserId.toString());
        if (this.allowAcceess == 2 || this.allowAcceess == 3) {
          this.manager = res.User;
        }
        // if (this.allowAcceess == 1) {
          if (1) {
          this.cand = res;

          if (this.cand.Candidate.EnterIn == 2) {
            this.secondCandidate = res;
          }
        }

        return res;
      }))

  }
  onlyGetDetailsByTz(u: User): Observable<DetaileCandidate> {

    return this.http.post<DetaileCandidate>(environment.api + '/GetDetailsByTz/', u)

  }
  getUseId(u: User): Observable<number> {
    return this.http.post<number>(environment.api + '/getUseId/', u)

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
