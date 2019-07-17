
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  
  enter(){
    this.router.navigate(['/enter']);
  }
  register(){
    this.router.navigate(['/register']);
  }

  calander(){
    this.router.navigate(['/calander']);
  }
  matcMacker(){
    this.router.navigate(['/MatcMaker']);
  }


 
  
}
