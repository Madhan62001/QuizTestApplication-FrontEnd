import { formatCurrency } from '@angular/common';
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
  sucMsg: string = "";
  errMsg: string = "";
  warnMsg: string = "";
  iserror: boolean = false;
  isReg: boolean = false;
  iswarn: boolean = false;
  duration: number = 2000;
  email:string="";
  feed:string="";
  name:string="";
  constructor(private route:Router, private connection:ConnectionsService){}
  ngOnInit(){
    this.connection.fetch().subscribe({
      next: (res) => {
        this.name = res.name;
        //console.log(res);
      }
    });
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
  toQuiz():void{
    this.route.navigate(['/quiz']);
  }
  profile():void{
    this.route.navigate(['./profile']);
  }
  submit():void{
    console.log(this.email);
    console.log(this.feed);
    const email = 'madhan.2k01@gmail.com';
    const subject = 'Mail from '+this.name+"!";
    const body = this.feed;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  }
  logout():void{
    this.connection.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.isLogged = false;
        localStorage.setItem("token", JSON.stringify(null));
        localStorage.setItem("isLoggedIn", JSON.stringify(this.isLogged));
        this.isReg=true;
        this.sucMsg = "Logged Out!";
        setTimeout(() => {
          this.isReg = false;
        }, this.duration);
      },
      error:(e)=>console.error(e)
    });
  }
}
