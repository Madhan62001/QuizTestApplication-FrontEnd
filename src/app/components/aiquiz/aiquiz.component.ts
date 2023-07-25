import { Component } from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aiquiz',
  templateUrl: './aiquiz.component.html',
  styleUrls: ['./aiquiz.component.css']
})
export class AiquizComponent {
  topics: string[]=[];
  isLoading:boolean=false;
  historyChecked:boolean=false;
  geoChecked:boolean=false;
  sciChecked:boolean=false;
  movChecked:boolean=false;
  musicChecked:boolean=false;
  outChecked:boolean=false;
  litChecked:boolean=false;
  gkChecked:boolean=false;
  uName:string="";
  constructor(private conn: ConnectionsService, private route:Router){}
  submit():void{
    if(this.historyChecked){
      this.topics.push("History");
    }
    if(this.geoChecked){
      this.topics.push("Geography");
    }
    if(this.sciChecked){
      this.topics.push("Science");
    }
    if(this.litChecked){
      this.topics.push("Literature");
    }
    if(this.movChecked){
      this.topics.push("Movies");
    }
    if(this.musicChecked){
      this.topics.push("Music");
    }
    if(this.gkChecked){
      this.topics.push("General Knowledge");
    }
    if(this.outChecked){
      this.topics.push("OutDoor Games");
    }
    console.log(this.topics);
    const data={
      topics:this.topics
    }
    this.conn.aiInfo(data).subscribe({
      next:(res)=>{
        this.isLoading=true;
        console.log(res);
      },error:(e)=>{
        console.log(e);
      }
    })
  }
  quiz():void{
    localStorage.setItem('UName',this.uName);
    this.route.navigate(['./quiz']);
  }
  logout():void{
    this.conn.logout().subscribe({
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
