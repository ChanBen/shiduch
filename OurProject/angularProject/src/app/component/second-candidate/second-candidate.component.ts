import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/Services/candidate.service';

@Component({
  selector: 'app-second-candidate',
  templateUrl: './second-candidate.component.html',
  styleUrls: ['./second-candidate.component.css']
})
export class SecondCandidateComponent implements OnInit {

  constructor( private dCandidateService: CandidateService) { }

  ngOnInit() {
 this.getValueList();
  }


  getValueList() {
    this.dCandidateService.getAllValueList().subscribe((res) => {
      this.dCandidateService.arrValue = res;
      
    }, (err) => {

    });}
 
}
