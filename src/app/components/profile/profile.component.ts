import { Component, OnInit, DoCheck } from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  name:String="";
  email:String="";
  jmon:String="";
  jyr:String="";
  sub:String="";
  isMale:boolean=false;
  isFemale:boolean=false;
  isBot:boolean=false;
  isSub:boolean=false;
  tleft:number=0;
  gender:String="";
  paymentHandler: any = null;
  isLogged:boolean=false;
  amt:any;
  dum:boolean=false;
  constructor(private conn: ConnectionsService, private route:Router){}
  doPerform(){
    this.conn.profile().subscribe({
      next:(res)=>{
        this.name=res.userName;
        this.email=res.email;
        this.jmon=res.joinMonth;
        this.jyr=res.joinYear;
        this.sub=res.subscribed;
        this.tleft=res.turnsLeft;  
        this.gender=res.gender;  
        console.log(this.gender);    
        if(this.sub=="true"){
          this.isSub=true;
        }
        if(this.gender=="male" || this.gender=="Male"){
          this.isMale=true;
        }else if(this.gender=="Female" || this.gender=="female"){
          this.isFemale=true;
        }else{
          this.isBot=true;
        }
      }
    });
  }
  ngOnInit(){
    this.doPerform();
    this.invokeStripe();
    this.isLogged= JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
  }
  ngDoCheck(){
    if(this.dum){
      this.setPayment();
      this.dum=false;
    }
  }
  setPayment(){
    if(this.amt==29){
      this.tleft=15;
    }
    else if(this.amt==59){
      this.tleft=25;
    }
    else{
      this.tleft=100;
    }
    const d={
      t:this.tleft
    }
    this.conn.subscription(d).subscribe({
      next:(res: any)=>{
        console.log(res);
      }
    });
    this.isSub=true;
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NZseaSGyDELcDVJzGeks6fCXMAqlrIXEwNRDrcY26ARh75H6EotDNLfOvkAWOOpFTcZntO3tL7FhNgqpIjMy4tY00zb4k2uC4',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Payment Successful!');
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
    this.amt=amount;
    this.dum=true;
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51NZseaSGyDELcDVJzGeks6fCXMAqlrIXEwNRDrcY26ARh75H6EotDNLfOvkAWOOpFTcZntO3tL7FhNgqpIjMy4tY00zb4k2uC4',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        }); 
      };
      window.document.body.appendChild(script);
    }
  }

  toQuiz():void{
    this.route.navigate(['/quiz']);
  }
  logout():void{
    this.conn.logout().subscribe({
      next:(res)=>{
        console.log(res);
        this.isLogged=false;
        localStorage.setItem("token",JSON.stringify(null));
        localStorage.setItem("isLoggedIn",JSON.stringify(this.isLogged));
        alert("Logged Out!");
      },
      error:(e)=>console.error(e)
    });
  }
  nav():void{
    this.route.navigate(['./board']);
  }

}
