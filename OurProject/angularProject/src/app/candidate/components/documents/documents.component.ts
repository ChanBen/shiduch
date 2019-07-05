import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from 'src/app/Services/candidate.service';
import { DetaileCandidate } from 'src/app/models/detaile-candidate';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  constructor(private http: HttpClient, private CandidateService: CandidateService) { }
  newFile;
  cand: DetaileCandidate;
  imageName:string;
  ngOnInit() {
    this.cand = this.CandidateService.currentCandidate;
    // this.m.start.toString().split(/T|Z/)[1];
    this.imageName= this.cand.Candidate.ImageCandidate.split("/")[1];
  }

  addImage(event) {
    if (this.cand.Candidate.ImageCandidate != null || this.cand.Candidate.ImageCandidate != "")
      if (!confirm("?האם אתה רוצה להחליף תמונה"))
        return;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.newFile = fileList[0];
      let image1: FormData = new FormData();
      this.imageName= this.newFile.name;
      image1.append('uploadFile', this.newFile, this.newFile.name);
      this.CandidateService.uploadFile(image1, this.CandidateService.currentCandidate.User.Tz).subscribe(() => { })
    }
  }

  addDoc(event) {
    let image1: FormData = new FormData();
    
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      for(let i=0;i<fileList.length;i++){
        this.newFile = fileList[i];
        image1.append('uploadFile', this.newFile, this.newFile.name);
      }
      this.CandidateService.UploadDoc(image1, this.CandidateService.currentCandidate.User.Tz).subscribe(() => { })
    }
  }

  // addFile() {
  //   if(this.newFile){
  //     let formData: FormData = new FormData();
  //     formData.append('uploadFile', this.newFile, this.newFile.name);
  //     this.CandidateService.postFileUpLoad(formData,this.CandidateService.currentCandidate.User.Tz).subscribe(()=>{

  //       alert('success!');
  //     })
  //   }
  // }



  // onSubmit(form: any) {
  //   console.log(this.RegisterTeacher);
  //   console.log(this.registerAddress);
  //   this.teachersService.createTeacher(this.RegisterTeacher, this.registerAddress).subscribe(data => {
  //     console.log(data);
  //   });
  //   console.log("d ");
  //   this.rout.navigate(['schedule']);//מעביר למסך מערכת השעות
  // }
}
