import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/auth/connections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  but:boolean=false;
  isLogged:boolean=false;
  constructor(private route:Router, private connection:ConnectionsService){}
  ngOnInit(){
    //console.log("Came Here!")
    this.isLogged= JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
  }
  sgquiz():void{
    this.but=true;
    this.route.navigate(['./sgquiz']);
  }
  aiquiz():void{
    this.but=true;
    this.route.navigate(['./aiquiz']);
  }
  nav():void{
    this.route.navigate(['./register']);
  }
  pay():void{
    this.route.navigate(['./payment']);
  }
  toQuiz():void{
    this.route.navigate(['/quiz']);
  }
  profile():void{
    this.route.navigate(['./profile']);
  }
}
