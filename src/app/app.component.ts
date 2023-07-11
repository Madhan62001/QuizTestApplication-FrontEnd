import { Component } from '@angular/core';
import { ConnectionsService } from './auth/connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quizkr';
  constructor(private connection:ConnectionsService, private route: Router){}

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
