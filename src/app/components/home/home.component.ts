import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  but:boolean=false;
  constructor(private route:Router){}
  sgquiz():void{
    this.but=true;
    this.route.navigate(['./sgquiz']);
  }
  aiquiz():void{
    this.but=true;
    this.route.navigate(['./aiquiz']);
  }

}
