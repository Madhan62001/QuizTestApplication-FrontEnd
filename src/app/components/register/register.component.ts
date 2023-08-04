import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,  AbstractControl, ValidationErrors } from '@angular/forms';
import { ConnectionsService } from 'src/app/auth/connections.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userName:string="";
  emailID:string="";
  password:string="";
  cpassword:string="";
  errorMessage = '';
  logname:string="";
  logpass:string="";
  isLoggedIn:boolean=false;
  constructor(private route:Router, private connection: ConnectionsService){  }

  register(): void{
    if(this.password==this.cpassword){
      const data= {
        userName: this.userName,
        emailID: this.emailID,
        password: this.password
      };
      this.connection.create(data).subscribe({
        next: (res)=>{
          console.log(res.message),
          alert("Registered Successfully")
        },
        error:(e)=>console.error(e)
      });
    }
    else{
      alert("Retype password doesn't match!");
    }
  }

  login():void{
    console.log("Came Here!")
    const data={
      userName: this.logname,
      password: this.logpass
    };
    this.connection.login(data).subscribe({
      next: (res)=>{
        this.isLoggedIn=true;
        //console.log(res);
        localStorage.setItem('token',res.token);
        localStorage.setItem('isLoggedIn',JSON.stringify(this.isLoggedIn));
        alert("LoggedIn Successfully!")
        this.route.navigate([''])
      },
      error:(e)=>console.error(e)
    });
  }

}