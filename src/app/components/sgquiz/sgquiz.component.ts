import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup } from '@angular/forms';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sgquiz',
  templateUrl: './sgquiz.component.html',
  styleUrls: ['./sgquiz.component.css']
})
export class SgquizComponent {
  public myForm: FormGroup;
  isLogged: boolean = false;
  hide: boolean = false;
  tolink: boolean = true;
  qname: string = "";
  // counter:number=30;
  // validity:number=0;
  tleft: number = 0;
  link: string = ""
  static questions: any[] = [];
  sucMsg: string = "";
  errMsg: string = "";
  warnMsg: string = "";
  iserror: boolean = false;
  isReg: boolean = false;
  iswarn: boolean = false;
  duration: number = 2000;
  jlk: boolean = true;
  dis:boolean=false;
  constructor(private fb: FormBuilder, private cons: ConnectionsService, private route: Router) {
    this.myForm = fb.group({
      question: [],
      answer1: [],
      answer2: [],
      answer3: [],
      answer4: [],
      cAnswer: []
    })
  }
  ngOnInit() {
    this.cons.fetch().subscribe({
      next: (res) => {
        this.tleft = res.turnsLeft;
        if (this.tleft == 0) {
          this.iswarn = true;
          this.warnMsg = "Your Quiz Turns Expired!";
          this.dis=true;
          setTimeout(() => {
            this.iswarn = false;
          }, 5000);
        }
      }
    });
    this.isLogged = JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
  }
  check(ans: any, s: string): any {
    if (ans === this.myForm.controls[s].value) {
      let d = {
        text: this.myForm.controls[s].value,
        correct: true
      }
      return d;
    } else {
      let d = {
        text: this.myForm.controls[s].value,
        correct: false
      }
      return d;
    }
  }
  // check1(){
  //   this.o.push(this.myForm.controls[FormControlName].value)
  //   // for (let i = 0; i < options.length; i++) {
  //   //   for (let j = i + 1; j < options.length; j++) {
  //   //     if (options[i] === options[j]) {
  //   //       return true; 
  //   //     }
  //   //   }
  //   // }

  //   return false;
  // }
  assign(): void {
    let options: any[] = [];
    let ans = this.myForm.controls['cAnswer'].value;
    options.push(this.check(ans, "answer1"));
    options.push(this.check(ans, "answer2"));
    options.push(this.check(ans, "answer3"));
    options.push(this.check(ans, "answer4"));
    const data = {
      questionText: this.myForm.controls['question'].value,
      options
    }
    SgquizComponent.questions.push(data);
    this.isReg = true;
    this.sucMsg = "Question Added!";
    setTimeout(() => {
      this.isReg = false;
    }, this.duration);
  }
  submit() {
    this.assign();
    this.myForm.reset();
  }

  finished(): void {
    this.assign();
    const data = {
      qname: this.qname,
      questions: SgquizComponent.questions
    }
    this.cons.passuserquiz(data).subscribe({
      next: (res) => {
        console.log(res);
        this.link = res.id + "1";
        this.isReg = true;
        this.sucMsg = "Quiz Has Been Generated!";
        setTimeout(() => {
          this.isReg = false;
          this.hide = true;
        }, this.duration);
      },
      error: (e) => {
        this.errMsg = "Not Signed In!";
        this.iserror = true;
        setTimeout(() => {
          this.iserror = false;
          this.route.navigate(['./login']);
        }, this.duration);
        console.error(e);
      }
    });
  }
  copyLink(): void {
    const li = document.getElementById('quizLink') as HTMLInputElement;
    li.select();
    document.execCommand('copy');
    this.iswarn = true;
    this.warnMsg = "Link Copied To ClipBoard!";
    setTimeout(() => {
      this.iswarn = false;
      this.route.navigate(['./quiz']);
    }, this.duration);
  }
  nav(): void {
    this.route.navigate(['./register']);
  }
  fin(): void {
    // console.log(this.qname);
    // console.log(this.counter);
    // console.log(this.validity);
    this.jlk = false;
  }
  logout(): void {
    this.cons.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.isLogged = false;
        localStorage.setItem("token", JSON.stringify(null));
        localStorage.setItem("isLoggedIn", JSON.stringify(this.isLogged));
        this.isReg = true;
        this.sucMsg = "Logged Out!";
        setTimeout(() => {
          this.isReg = false;
          this.route.navigate(['./'])
        }, this.duration);
      },
      error: (e) => console.error(e)
    });
  }
}
