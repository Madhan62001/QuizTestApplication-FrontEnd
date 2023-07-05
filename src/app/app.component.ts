import { Component } from '@angular/core';
import { ConnectionsService } from './auth/connections.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quizkr';
  constructor(private connection:ConnectionsService){}
  logout():void{
    console.log("Function!")
    this.connection.logout().subscribe({
      next:(res)=>{
        console.log(res);
        alert("Logged Out!")
      },
      error:(e)=>console.error(e)
    });
  }
}
