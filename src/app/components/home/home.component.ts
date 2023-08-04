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
  logout():void{
    this.connection.logout().subscribe({
      next:(res)=>{
        console.log(res);
        this.isLogged=false;
        localStorage.setItem("token",JSON.stringify(null));
        localStorage.setItem("isLoggedIn",JSON.stringify(this.isLogged));
        alert("Logged Out!");
      },
      error:(e)=>console.error(e)
    });
  }
}
