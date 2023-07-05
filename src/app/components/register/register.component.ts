import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/auth/connections.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLogin: boolean=false;
  form: any={
    userName: null,
    emailID: null,
    password: null,
    cpassword: null
  }
  errorMessage = '';
  constructor(private route:Router, private connection: ConnectionsService){ }
  onSubmit(): void{
    if(this.form.password==this.form.cpassword){
      const data= {
        userName: this.form.userName,
        emailID: this.form.emailID,
        password: this.form.password
      };
      this.connection.create(data).subscribe({
        next: (res)=>{
          console.log(res.message),
          this.isLogin=true,
          alert("Registered Successfully")
          this.route.navigate(['../login'])
        },
        error:(e)=>console.error(e)
      });
    }
    else{
      alert("Retype password doesn't match!");
    }
  }
}
