import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CandidateComponent } from './candidate/candidate.component';
import { PersonalDetailsComponent } from './candidate/components/personal-details/personal-details.component';
import { DescriptionComponent } from './candidate/components/description/description.component';
import { BusinesComponent } from './candidate/components/busines/busines.component';
import { MoreDetailesComponent } from './candidate/components/more-detailes/more-detailes.component';
import { DocumentsComponent } from './candidate/components/documents/documents.component';
import { CriterionComponent } from './candidate/components/criterion/criterion.component';
import { CandidateService } from './Services/candidate.service';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterComponent } from './register/register.component';
import { EnterComponent } from './enter/enter.component';
import { MatchMakerComponent } from './component/matchMaker/match-maker/match-maker.component';
import { Mail1Component } from './component/matchMaker/match-maker/mail1/mail1.component';
import { CalendarComponent } from './component/matchMaker/match-maker/calendar/calendar.component';
import { MigbalaComponent } from './candidate/components/migbala/migbala.component';
import { CompleteRegisterComponent } from './component/matchMaker/match-maker/complete-register/complete-register.component';
import { SuggestsComponent } from './component/second-candidate/suggests/suggests.component';
import { SecondCandidateComponent } from './component/second-candidate/second-candidate.component';
import { DetailsComponent } from './component/second-candidate/details/details.component';
import { AllSuggestsComponent } from './component/matchMaker//match-maker/all-suggests/all-suggests.component';
import { AllCandidateComponent } from './component/matchMaker/match-maker/all-candidate/all-candidate.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatchmakerRegisterComponent } from './component/matchMaker/match-maker/matchmaker-register/matchmaker-register.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { NewMeetingComponent } from './component/matchMaker/match-maker/calendar/new-meeting/new-meeting.component';
import { MailCandComponent } from './component/second-candidate/mail-cand/mail-cand.component';


const routes: Routes = [
  // { path: '', redirectTo: 'home-page', pathMatch: 'full' },
  { path: '', component: HomePageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'enter', component: EnterComponent },
  {
    path: 'detail-candidate', component: CandidateComponent, children: [
      { path: '', redirectTo: 'pro', pathMatch: 'full' },
      { path: 'pro', component: PersonalDetailsComponent },
      { path: 'desc', component: DescriptionComponent },
      { path: 'migbala', component: MigbalaComponent },
      { path: 'busines', component: BusinesComponent },
      { path: 'moreDetailes', component: MoreDetailesComponent },
      { path: 'doc', component: DocumentsComponent },
      { path: 'criterion', component: CriterionComponent },
   
    ]
  },
  {
    path: 'MatcMaker', component: MatchMakerComponent, children: [
      { path: '', redirectTo: 'complitDitails', pathMatch: 'full' },
      { path: 'complitDitails', component: CompleteRegisterComponent },
      { path: 'calander', component: CalendarComponent },
      { path: 'allSuggest', component: AllSuggestsComponent },
      { path: 'allCandidate', component: AllCandidateComponent },
      { path: 'matcMakerRegister', component: MatchmakerRegisterComponent },
    ]
  },

  {
    path: 'second-candidate', component: SecondCandidateComponent, children: [
      { path: '', redirectTo: 'suggest', pathMatch: 'full' },
      { path: 'suggest', component: SuggestsComponent },
      { path: 'details', component: DetailsComponent },
      { path: 'mailToMatcmaker', component: MailCandComponent },



    ]
  },
  { path: 'calander', component: CalendarComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    DescriptionComponent,
    PersonalDetailsComponent,
    CandidateComponent,
    MigbalaComponent,
    BusinesComponent,
    DocumentsComponent,
    MoreDetailesComponent,
    CriterionComponent,
    HomePageComponent,
    RegisterComponent,
    EnterComponent,
    MatchMakerComponent,
    Mail1Component,
    CalendarComponent,
    CompleteRegisterComponent,
    SecondCandidateComponent,
    SuggestsComponent,
    DetailsComponent,
    AllSuggestsComponent,
    AllCandidateComponent,
    MatchmakerRegisterComponent,
    NewMeetingComponent,
    DetailsComponent,
    MailCandComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule.forRoot(routes),
    ModalModule.forRoot(),
  ],
  entryComponents: [
    NewMeetingComponent,
    DetailsComponent
  ],
  providers: [
    CandidateService,
    BsModalService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
