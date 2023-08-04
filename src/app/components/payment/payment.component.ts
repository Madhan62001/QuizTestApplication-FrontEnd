import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionsService } from 'src/app/auth/connections.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentHandler: any = null;
  isLogged:boolean=false;
  constructor(private conn:ConnectionsService,private route: Router) { }
  ngOnInit() {
    this.invokeStripe();
    this.isLogged= JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51NZseaSGyDELcDVJzGeks6fCXMAqlrIXEwNRDrcY26ARh75H6EotDNLfOvkAWOOpFTcZntO3tL7FhNgqpIjMy4tY00zb4k2uC4',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Positronx',
      description: '3 widgets',
      amount: amount * 100,
    });
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
  nav():void{
    this.route.navigate(['./register']);
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
}

