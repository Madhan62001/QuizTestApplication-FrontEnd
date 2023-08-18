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
  sucMsg: string = "";
  errMsg: string = "";
  warnMsg: string = "";
  iserror: boolean = false;
  isReg: boolean = false;
  iswarn: boolean = false;
  duration: number = 2000;
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
        this.link=res.id+"2";
        this.isReg = true;
        this.sucMsg = "Quiz Has Been Generated!";
        setTimeout(() => {
          this.isReg = false;
        }, this.duration);
      },error:(e)=>{
        this.errMsg = "Not Signed In!";
        this.iserror = true;
        setTimeout(() => {
          this.iserror = false;
          this.route.navigate(['./register']);
        }, this.duration);
        console.error(e);
      }
    })
  }
  copyLink():void{
    const li=document.getElementById('quizLink') as HTMLInputElement;
    li.select();
    document.execCommand('copy');
    this.iswarn = true;
    this.warnMsg="Link Copied To ClipBoard!";
    setTimeout(() => {
      this.iswarn = false;
      this.route.navigate(['./quiz']);
    }, this.duration);
  }
  nav():void{
    this.route.navigate(['./register']);
  }
  logout():void{
    this.conn.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.isLogged = false;
        localStorage.setItem("token", JSON.stringify(null));
        localStorage.setItem("isLoggedIn", JSON.stringify(this.isLogged));
        this.isReg=true;
        this.sucMsg = "Logged Out!";
        setTimeout(() => {
          this.isReg = false;
          this.route.navigate(['./'])
        }, this.duration);
      },
      error:(e)=>console.error(e)
    });
  }
}
