import { Component, OnInit} from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-fpassword',
  templateUrl: './fpassword.component.html',
  styleUrls: ['./fpassword.component.css']
})
export class FpasswordComponent {
  hide:boolean=false;
  temp:boolean=false;
  mail:string="";
  isValid:boolean=true;
  emails: any[] = [];
  password:string="";
  cpassword:string="";
  sucMsg: string = "";
  errMsg: string = "";
  warnMsg: string = "";
  iserror: boolean = false;
  isReg: boolean = false;
  iswarn: boolean = false;
  duration: number = 2000;
  primaryColor: string="";
  backgroundStyle: string="";
  constructor(private conn: ConnectionsService, private route:Router, protected themeService: ThemeService){}
  ngOnInit(){
    this.conn.get().subscribe({
      next: (res) => {
        this.emails = res.emails;
      }
    });
    this.hide=JSON.parse(localStorage.getItem('hide') || '{}');
    this.temp=JSON.parse(localStorage.getItem('temp')||'{}');
    // this.themeService.themeChanged.subscribe((theme) => {
    //   this.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    //   this.backgroundStyle = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
    // });
    //console.log(this.hide);
  }
  check(){
    if(this.mail==""){
      this.isValid=true;
    }
    for(var i=0;i<this.emails.length;i++){
      if(this.mail == this.emails[i].emailID){
        this.isValid=false;
        this.isReg = true;
        this.sucMsg = "Mail Valid!";
        setTimeout(() => {
          this.isReg = false;
        }, this.duration);
      }
    }
    if(this.isValid){
      this.errMsg = "Not Valid Email!";
      this.iserror = true;
        setTimeout(() => {
          this.iserror = false;
        }, this.duration);
    }
  }
  submit(){
    this.hide=true;
    localStorage.setItem('hide', JSON.stringify(this.hide));
    // console.log(this.mail);
    // console.log(this.hide);
    const data={
      m:this.mail,
      subject: "Link To Change Password![QuizkR]",
      text:"Link to change Password is: http://localhost:4200/pass"
    }
    this.conn.mail(data).subscribe({
      next:(res)=>{
        //console.log(res);
        this.isReg = true;
        this.sucMsg = "Link Sent to Mail!";
        setTimeout(() => {
          this.isReg = false;
        }, this.duration);
        localStorage.setItem('mail',this.mail);
        localStorage.setItem('hide', JSON.stringify(false));
        localStorage.setItem('temp',JSON.stringify(true));
      }
    })
  }
  send(){
    const data={
      m:localStorage.getItem('mail'),
      p:this.password
    }
    this.conn.reset(data).subscribe({
      next:(res)=>{
        console.log(res);
        this.isReg = true;
        this.sucMsg = "Password Updated!";
        setTimeout(() => {
          this.isReg = false;
          localStorage.removeItem('mail');
          this.route.navigate(['./register']);
        }, this.duration);
      }
    })
  }
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get currentTheme(): string {
    return this.themeService.getTheme();
  }
}
