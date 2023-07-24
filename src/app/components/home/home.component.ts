import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/auth/connections.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  but:boolean=false;
  constructor(private route:Router, private connection:ConnectionsService){}
  sgquiz():void{
    this.but=true;
    this.route.navigate(['./sgquiz']);
  }
  aiquiz():void{
    this.but=true;
    this.route.navigate(['./aiquiz']);
  }
  logout():void{
    this.connection.logout().subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.getItem("token");
        localStorage.removeItem("token");
        alert("Logged Out!");
      },
      error:(e)=>console.error(e)
    });
  }
}
