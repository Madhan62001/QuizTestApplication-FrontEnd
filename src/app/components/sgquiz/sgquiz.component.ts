import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  link: string = ""
  static questions: any[] = [];
  sucMsg: string = "";
  errMsg: string = "";
  warnMsg: string = "";
  iserror: boolean = false;
  isReg: boolean = false;
  iswarn: boolean = false;
  duration: number = 2000;
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
      this.hide = true;
    }, this.duration);
  }
  submit() {
    this.assign();
    this.myForm.reset();
  }

  finished(): void {
    this.assign();
    const data = {
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
        }, this.duration);
      },
      error: (e) => console.error(e)
    });
  }
}
