import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserToSuggest } from '../models/user-to-suggest';

@Injectable({
  providedIn: 'root'
})
export class SecondCandidateService {

  constructor(public http: HttpClient) { }


  GetListUserOfSuggestByTz(Tz: string) {//
    return this.http.get<UserToSuggest[]>(environment.api + '/GetListUserOfSuggestByTz?Tz=' + Tz);
  }



  Interested(u: User, tz: string) {
    return this.http.post(environment.api + '/Interested', [u, tz]);
  }
  NotInterested(u: User, tz: string) {
    return this.http.post(environment.api + '/NotInterseted', [u, tz]);
  }


  mailToMatcmaker(subject, text) {
    return this.http.get(environment.api + '/mailToMatcmaker?subject=' + subject + '&text=' + text);
  }
}
