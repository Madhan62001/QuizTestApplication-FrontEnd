import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/auth/connections.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogin:boolean=false;
  form: any={
    userName: String,
    password: String
  }
  user:any;
  loggedIn:any;
  errorMessage = '';
  constructor(private route: Router,private connection: ConnectionsService){}

  onSubmit():void{
    const data={
      userName: this.form.userName,
      password: this.form.password
    };
    this.connection.login(data).subscribe({
      next: (res)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this.isLogin=true,
        alert("LoggedIn Successfully!")
        this.route.navigate(['./home'])
      },
      error:(e)=>console.error(e)
    });
  }
}
