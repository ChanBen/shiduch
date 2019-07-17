import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CandidateService } from '../Services/candidate.service';
import { DetaileCandidate } from '../models/detaile-candidate';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router, private dCandidateService: CandidateService) { }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAccess(state.url);
  }

  checkAccess(url: string): Observable<boolean> {

    return this.dCandidateService.getCand().pipe(map((res: DetaileCandidate) => {
      return this.getAccess(url, res);
    }))
  }

  getAccess(url: string, cand: DetaileCandidate): boolean {
    
    let allowAccess = cand.User.AllowAccess;
    let enterIn = cand.Candidate.EnterIn;
    let urlArray = url.split('/');

    switch (allowAccess) {

      case 1:
        if (enterIn === 3) {
          this.redirectToHomePage();
        }
        if (urlArray.includes('detail-candidate')) {
          return true;
        } else {
          if (urlArray.includes('second-candidate')) {
            if (enterIn === 2) {
              return true;
            }
          }
        }

      case 2:
        if (url === '/MatcMaker/matcMakerRegister') {
          this.redirectToHomePage();
        }
        if (urlArray.includes('MatcMaker')) {
          return true;
        }

      case 3:
        return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    this.redirectToHomePage();
  }

  redirectToHomePage(): boolean {

    // Navigate to the login page with extras
    this.router.navigate(['/']);
    return false;

  }
}


   
    /*     
        let allowAccess: any = localStorage.getItem("allowAccess");
        allowAccess = +atob(allowAccess);
        let enterIn: any = localStorage.getItem("enterIn");
        enterIn = +atob(enterIn); */


