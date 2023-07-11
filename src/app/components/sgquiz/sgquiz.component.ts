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
  static qarr:String[]=[];
  static o1:String[]=[];
  static o2:String[]=[];
  static o3:String[]=[];
  static o4:String[]=[];
  static ca:String[]=[];
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
  submit() {
    SgquizComponent.qarr.push(this.myForm.controls['question'].value);
    SgquizComponent.o1.push(this.myForm.controls['answer1'].value);
    SgquizComponent.o2.push(this.myForm.controls['answer2'].value);
    SgquizComponent.o3.push(this.myForm.controls['answer3'].value);
    SgquizComponent.o4.push(this.myForm.controls['answer4'].value);
    SgquizComponent.ca.push(this.myForm.controls['cAnswer'].value);
    this.myForm.reset();
  }
  
  finished():void{
    //console.log("Comes Here!")
    SgquizComponent.qarr.push(this.myForm.controls['question'].value);
    SgquizComponent.o1.push(this.myForm.controls['answer1'].value);
    SgquizComponent.o2.push(this.myForm.controls['answer2'].value);
    SgquizComponent.o3.push(this.myForm.controls['answer3'].value);
    SgquizComponent.o4.push(this.myForm.controls['answer4'].value);
    SgquizComponent.ca.push(this.myForm.controls['cAnswer'].value);
    const data={
      qarr:SgquizComponent.qarr,
      o1:SgquizComponent.o1,
      o2:SgquizComponent.o2,
      o3:SgquizComponent.o3,
      o4:SgquizComponent.o4,
      ca:SgquizComponent.ca
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
    this.route.navigate(['./quiz']);
  }
}
