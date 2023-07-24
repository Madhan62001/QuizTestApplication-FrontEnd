import { Component } from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aiquiz',
  templateUrl: './aiquiz.component.html',
  styleUrls: ['./aiquiz.component.css']
})
export class AiquizComponent {
  static topics: string[]=[];
  isLoading:boolean=false;
  uName:string="";
  constructor(private conn: ConnectionsService, private route:Router){}
  ai():void{
    AiquizComponent.topics.push("Artificial Intelligence");
  }
  cs():void{
    AiquizComponent.topics.push("Cyber Security");
  }
  wd():void{
    AiquizComponent.topics.push("Web Development");
  }
  submit():void{
    console.log(AiquizComponent.topics);
    const data={
      topics:AiquizComponent.topics
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
}
