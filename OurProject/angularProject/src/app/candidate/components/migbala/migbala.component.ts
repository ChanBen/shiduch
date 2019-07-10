import { Component, OnInit } from '@angular/core';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';
import { CandidateService } from 'src/app/Services/candidate.service';
import { MigbalaCandidate } from 'src/app/models/migbala-candidate';
import { Hospitalizition } from 'src/app/models/hospitalizition';
import { ValueListCandidate } from 'src/app/models/value-list-candidate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-migbala',
  templateUrl: './migbala.component.html',
  styleUrls: ['./migbala.component.css']
})
export class MigbalaComponent implements OnInit {
  isMigbala: boolean;//שייך למגבלה
  numMigbala: number;//שייך למגבל
  numMedical: number;
  
  numHospitalizion: number;
  cand: DetaileCandidate;

  constructor(private dCandidateService: CandidateService, public Router: Router) { }



  ngOnInit() {
    this.init1();
    this.dCandidateService.onLogined.subscribe(res => {
      this.init1();

    })

  }

  init1() {
    this.cand = this.dCandidateService.currentCandidate;
    this.numMigbala = this.cand.MigbalaCandidates.length;//שייך למגבל
    this.isMigbala = this.cand.MigbalaCandidates.length != 0;//שייך למגבלה
    this.numMedical = this.cand.ValueListCandidate.filter(p => p.CriteriaId == 34 && p.isSelf == true).length;
    this.numHospitalizion = this.cand.Hospitalizations.length;
  }
  addMigbala() {//שייך למגבלה
    let paar = this.cand.MigbalaCandidates.length - this.numMigbala;
    if (this.cand.MigbalaCandidates.length > this.numMigbala)
      this.cand.MigbalaCandidates = this.cand.MigbalaCandidates.splice(0, this.numMigbala);
    else
      for (let i = 0; i < paar * -1; i++)
        this.cand.MigbalaCandidates.push(new MigbalaCandidate());
  }

  addHospitalizition() {//שייך למגבלה
    let paar = this.cand.Hospitalizations.length - this.numHospitalizion;
    if (this.cand.Hospitalizations.length > this.numHospitalizion)
      this.cand.Hospitalizations = this.cand.Hospitalizations.splice(0, this.numHospitalizion);
    else
      for (let i = 0; i < paar * -1; i++)
        this.cand.Hospitalizations.push(new Hospitalizition());
  }

  addmedicial() {

    let paar = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 34 && P.isSelf == true).length - this.numMedical;
    if (this.cand.ValueListCandidate.filter(P => P.CriteriaId == 34 && P.isSelf == true).length > this.numMedical)
      this.cand.ValueListCandidate = this.cand.ValueListCandidate.filter(P => P.CriteriaId == 34).splice(0, this.numMedical);
    else
      for (let i = 0; i < paar * -1; i++) {

        var currntValueList = new ValueListCandidate();

        currntValueList.CriteriaId = 34;
        currntValueList.isSelf = true;
        this.cand.ValueListCandidate.push(currntValueList);
      }
  }



  saveDetailCandidate() {//שומר את פרטי המועמד

    if (this.dCandidateService.allowAcceess == 1) {
      this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
        alert(res);
      });

    }
    else if (this.dCandidateService.allowAcceess == 2) {
      this.dCandidateService.finishCompliteDetails(this.cand).subscribe(res => {
        alert(res);
        this.Router.navigate(['/MatcMaker']);
      });
    }
  }

  saveAndContinue() {//שומר את פרטי המועמד וממשיך לתאב הבא
    this.dCandidateService.saveDetailCandidate(this.cand).subscribe(res => {
      alert(res);
    });

    //setActivePage('products')
    // this.router.navigate(['desc'], {relativeTo: this.activatedRoute});
    this.Router.navigate(['/detail-candidate/busines']);
  }
}
