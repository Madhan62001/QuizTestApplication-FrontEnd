import { Component } from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dsboard',
  templateUrl: './dsboard.component.html',
  styleUrls: ['./dsboard.component.css']
})
export class DsboardComponent {
  students: any[]=[];
  currentStudentIndex = 0;
  isStart:boolean=false;
  constructor(private conn:ConnectionsService){}
  ngOnInit(){
    this.conn.dsboard().subscribe({
      next:(res)=>{
        this.isStart=true;
        for(var i=0;i<res.users.length;i++){
          const d = {
            name: res.users[i].name,
            points: res.users[i].points,
            crtAns: res.users[i].crt,
            inAns: res.users[i].incrt
          };
          this.students.push(d);
          // console.log(this.students);
        }
        console.log(this.students);
      }
    })
  }

  nextStudent() {
    this.currentStudentIndex = (this.currentStudentIndex + 1) % this.students.length;
  }

  prevStudent() {
    this.currentStudentIndex = (this.currentStudentIndex - 1 + this.students.length) % this.students.length;
  }

  getTopStudents(): any[] {
    // Implement logic to sort and return top students based on scores
    return this.students.slice().sort((a, b) => b.points - a.points).slice(0, 5);
  }

  calculateAverageScore(): number {
    const totalPoints = this.students.reduce((total, student) => total + student.points, 0);
    return totalPoints / this.students.length;
  }

  calculateHighestScore(): number {
    return Math.max(...this.students.map(student => student.points));
  }

  calculateLowestScore(): number {
    return Math.min(...this.students.map(student => student.points));
  }

}
