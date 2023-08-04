import { Component, OnInit} from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aiquiz',
  templateUrl: './aiquiz.component.html',
  styleUrls: ['./aiquiz.component.css']
})
export class AiquizComponent {
  topics: string[]=[];
  link:string="";
  isLogged:boolean=false;
  isLoading:boolean=false;
  isreceived:boolean=true;
  load:boolean=false;
  historyChecked:boolean=false;
  geoChecked:boolean=false;
  sciChecked:boolean=false;
  movChecked:boolean=false;
  musicChecked:boolean=false;
  outChecked:boolean=false;
  litChecked:boolean=false;
  gkChecked:boolean=false;
  constructor(private conn: ConnectionsService, private route:Router){}
  ngOnInit(){
    this.isLogged= JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
  }
  submit():void{
    this.isLoading=true;
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
        this.isreceived=false;
        this.load=true;
        this.link=res.id;
        console.log(res);
      },error:(e)=>{
        console.log(e);
      }
    })
  }
  copyLink():void{
    const li=document.getElementById('quizLink') as HTMLInputElement;
    li.select();
    document.execCommand('copy');
    alert("Link Copied to ClipBoard!");
    this.quiz();
  }
  quiz():void{
    this.route.navigate(['./quiz']);
  }
  nav():void{
    this.route.navigate(['./register']);
  }
  logout():void{
    this.conn.logout().subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem("token",JSON.stringify(null));
        localStorage.setItem("isLoggedIn",JSON.stringify(this.isLogged));
        alert("Logged Out!");
      },
      error:(e)=>console.error(e)
    });
  }
}
