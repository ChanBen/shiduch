import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';

@Component({
  selector: 'app-match-maker',
  templateUrl: './match-maker.component.html',
  styleUrls: ['./match-maker.component.css']
})
export class MatchMakerComponent implements OnInit {
  cand: DetaileCandidate;
  constructor(private dCandidateService: CandidateService) { }

  ngOnInit() {
    // this.dCandidateService.getCand().subscribe(res => {
    //   // this.cand = res;
    //   this.dCandidateService.manager = res.User;

    // })
    this.getCriteria();
    this.getValueList();
  }

  getValueList() {
    this.dCandidateService.getAllValueList().subscribe((res) => {
      this.dCandidateService.arrValue = res;
    }, (err) => {

    });
  }

  getCriteria() {
    this.dCandidateService.getCriteria().subscribe((res) => {
      console.log(res); console.log("succes");
      this.dCandidateService.criterionsArr = res;
    }, (err) => { console.log(err); alert(err); });

  }
}
