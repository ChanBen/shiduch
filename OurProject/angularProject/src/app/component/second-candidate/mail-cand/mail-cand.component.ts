import { Component, OnInit } from '@angular/core';
import { SecondCandidateService } from 'src/app/Services/second-candidate.service';

@Component({
  selector: 'app-mail-cand',
  templateUrl: './mail-cand.component.html',
  styleUrls: ['./mail-cand.component.css']
})
export class MailCandComponent implements OnInit {

  constructor(private SecondCandidateService: SecondCandidateService) { }

  ngOnInit() {
  }
  mailToMatchMaker(subject, text) {
    this.SecondCandidateService.mailToMatcmaker(subject.value, text.value).subscribe(res => {
      console.log(res);

    })


  }
}
