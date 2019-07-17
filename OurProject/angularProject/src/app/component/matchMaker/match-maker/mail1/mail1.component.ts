import { Component, OnInit } from '@angular/core';

import { MatchmakerService } from 'src/app/Services/matchmaker.service';

@Component({
  selector: 'app-mail1',
  templateUrl: './mail1.component.html',
  styleUrls: ['./mail1.component.css']
})
export class Mail1Component implements OnInit {

  constructor(private MatchMakerComponent:MatchmakerService) { }

 
  ngOnInit() {
  }

  mailToCandidate(subject, text,m) {
    this.MatchMakerComponent.mailToCandidate(subject.value, text.value,m.value).subscribe(res => {
      console.log(res);

    })


  }


 
}
