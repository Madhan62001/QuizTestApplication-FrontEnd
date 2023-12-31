import { Component, OnInit, DoCheck } from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';
//Payment Message Varala!
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  name: String = "";
  email: String = "";
  jmon: String = "";
  jyr: String = "";
  sub: String = "";
  isMale: boolean = false;
  isFemale: boolean = false;
  isBot: boolean = false;
  isSub: boolean = false;
  isq:boolean=false;
  tleft: number = 0;
  gender: String = "";
  paymentHandler: any = null;
  isLogged: boolean = false;
  amt: any;
  dum: boolean = false;
  sucMsg: string = "";
  errMsg: string = "";
  warnMsg: string = "";
  iserror: boolean = false;
  isReg: boolean = false;
  iswarn: boolean = false;
  duration: number = 2000;
  isLoad:boolean=true;
  constructor(private conn: ConnectionsService, private route: Router) { }
  doPerform() {
    this.conn.profile().subscribe({
      next: (res) => {
        this.name = res.userName;
        this.email = res.email;
        this.jmon = res.joinMonth;
        this.jyr = res.joinYear;
        this.sub = res.subscribed;
        this.tleft = res.turnsLeft;
        this.gender = res.gender;
        this.isq=res.isq;
        console.log(this.isq);
        if (this.sub == "true") {
          this.isSub = true;
        }
        if (this.gender == "male" || this.gender == "Male") {
          this.isMale = true;
        } else if (this.gender == "Female" || this.gender == "female") {
          this.isFemale = true;
        } else {
          this.isBot = true;
        }
        // this.isReg = true;
        this.isLoad=false;
        // this.sucMsg = "Profile Fetched!";
        // setTimeout(() => {
        //   this.isReg = false;
        // }, this.duration);
      }
    });
  }
  ngOnInit() {
    this.doPerform();
    this.invokeStripe();
    this.isLogged = JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
  }
  ngDoCheck() {
    if (this.dum) {
      this.setPayment();
      this.dum = false;
    }
  }
  setPayment() {
    if (this.amt == 29) {
      this.tleft = 15;
    }
    else if (this.amt == 59) {
      this.tleft = 25;
    }
    else {
      this.tleft = 100;
    }
    const d = {
      t: this.tleft
    }
    this.conn.subscription(d).subscribe({
      next: (res: any) => {
        console.log(res);
      }
    });
    this.isSub = true;
    this.isReg=true;
    this.sucMsg="Payment SuccessFul!";
    setTimeout(() => {
      this.isReg = false;
    }, 10000);
  }

  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NZseaSGyDELcDVJzGeks6fCXMAqlrIXEwNRDrcY26ARh75H6EotDNLfOvkAWOOpFTcZntO3tL7FhNgqpIjMy4tY00zb4k2uC4',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken)
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
    this.amt = amount;
    this.dum = true;
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

  toQuiz(): void {
    this.route.navigate(['/quiz']);
  }
  logout(): void {
    this.conn.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.isLogged = false;
        localStorage.setItem("token", JSON.stringify(null));
        localStorage.setItem("isLoggedIn", JSON.stringify(this.isLogged));
        this.isReg = true;
        this.sucMsg = "Logged Out!";
        setTimeout(() => {
          this.isReg = false;
          this.route.navigate(['/']);
        }, this.duration);
      },
      error: (e) => console.error(e)
    });
  }
  nav(): void {
    this.route.navigate(['./board']);
  }

}
