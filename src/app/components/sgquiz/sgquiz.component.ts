import { Component } from '@angular/core';
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
  hide:boolean=false;
  static questions:any[]=[];
  uName:string="";
  constructor(private fb: FormBuilder, private cons:ConnectionsService, private route: Router) {
    this.myForm = fb.group({
      question: [],
      answer1: [],
      answer2: [],
      answer3: [],
      answer4: [],
      cAnswer:[]
    })
  }
  check(ans: any,s: string): any{
    if(ans===this.myForm.controls[s].value){
      let d={
        text: this.myForm.controls[s].value,
        correct: true
      }
      return d;
    }else{
      let d={
        text: this.myForm.controls[s].value,
        correct: false
      }
      return d;
    }
  }
  assign():void{
    let options:any[]=[];
    let ans=this.myForm.controls['cAnswer'].value;
    options.push(this.check(ans,"answer1"));
    options.push(this.check(ans,"answer2"));
    options.push(this.check(ans,"answer3"));
    options.push(this.check(ans,"answer4"));
    const data={
      questionText: this.myForm.controls['question'].value,
      options      
    }
    SgquizComponent.questions.push(data);
    //console.log(SgquizComponent.questions);
  }
  submit() {
    this.assign();
    this.myForm.reset();
  }
  
  finished():void{
    this.assign();
    const data={
      questions: SgquizComponent.questions
    }
    this.cons.passuserquiz(data).subscribe({
      next:(res)=>{
        console.log(res);
        this.hide=true;        
      },
      error:(e)=>{
        alert("Not Signed In");
        this.route.navigate(['./login']);
      }
    });
  }
  
  quiz():void{
    localStorage.setItem('UName',this.uName);
    this.route.navigate(['./quiz']);
  }
}
