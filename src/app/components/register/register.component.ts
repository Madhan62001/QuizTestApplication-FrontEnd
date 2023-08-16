import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ConnectionsService } from 'src/app/auth/connections.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userName: string = "";
  emailID: string = "";
  password: string = "";
  cpassword: string = "";
  errorMessage = '';
  logname: string = "";
  logpass: string = "";
  sucMsg: string = "";
  errMsg: string = "";
  warnMsg: string = "";
  isLoggedIn: boolean = false;
  iserror: boolean = false;
  isReg: boolean = false;
  iswarn: boolean = false;
  duration: number = 2000;
  users: any[] = [];
  emails: any[] = [];
  isValid:boolean=true;
  constructor(private route: Router, private connection: ConnectionsService) { }

  ngOnInit() {
    this.connection.get().subscribe({
      next: (res) => {
        this.users = res.usernames;
        this.emails = res.emails;
      }
    })
  }
  check(){
    //console.log("Comes Here!");
    //console.log(s);
    for (var i = 0; i < this.users.length; i++) {
      if (this.userName == this.users[i].userName) {
        this.isValid=false;
        this.warnMsg = "UserName Already Exists!";
        this.iswarn = true;
        setTimeout(() => {
          this.iswarn = false;
        }, 3000);
      }
      if(this.userName != this.users[i].userName){
        this.isValid=true;
      }
      if (this.emailID == this.emails[i].emailID) {
        this.isValid=false;
        this.warnMsg = "Email ID Already Exists!";
        this.iswarn = true;
        setTimeout(() => {
          this.iswarn = false;
        }, 3000);
      }
      if(this.emailID != this.emails[i].emailID){
        this.isValid=true;
      }
    }
    console.log(this.isValid);
  }
  register(): void {
    if (this.password == this.cpassword) {
      const data = {
        userName: this.userName,
        emailID: this.emailID,
        password: this.password
      };
      if(this.isValid){
        this.connection.create(data).subscribe({
          next: (res) => {
            this.isLoggedIn = true;
            localStorage.setItem('token', res.token);
            localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
            this.sucMsg = "Registered Successfully!";
            this.isReg = true;
            setTimeout(() => {
              this.isReg = false;
              this.route.navigate(['']);
            }, this.duration);
          },
          error: (e) => {
            this.errMsg = e;
            this.iserror = true;
            setTimeout(() => {
              this.iserror = false;
            }, this.duration);
            console.error(e);
          }
        });
      }
      else{
        this.iswarn = true;
        setTimeout(() => {
          this.iswarn = false;
        }, this.duration);
      }
    }
    else {
      this.warnMsg = "Retype password doesn't match!";
      this.iswarn = true;
      setTimeout(() => {
        this.iswarn = false;
      }, this.duration);
    }
  }

  login(): void {
    const data = {
      userName: this.logname,
      password: this.logpass
    };
    this.connection.login(data).subscribe({
      next: (res) => {
        this.isLoggedIn = true;
        //console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('isLoggedIn', JSON.stringify(this.isLoggedIn));
        this.sucMsg = "LogIn Successful!";
        this.isReg = true;
        setTimeout(() => {
          this.isReg = false;
          this.route.navigate(['']);
        }, this.duration);
      },
      error: (e) => {
        this.errMsg = "Invalid Username or Password!";
        this.iserror = true;
        setTimeout(() => {
          this.iserror = false;
        }, this.duration);
        console.error(e);
      }
    });
  }
}