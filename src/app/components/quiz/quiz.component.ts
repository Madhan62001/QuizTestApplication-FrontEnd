import { Component, OnInit, DoCheck} from '@angular/core';
import { ConnectionsService } from 'src/app/auth/connections.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  //isStarted:boolean=false;
  isCorrect:boolean=false;
  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  dupCompleted: boolean=false;
  constructor(private conn:ConnectionsService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("UName")!;
    this.start();
    this.startCounter();
  }
  ngDoCheck():void{
    if(this.dupCompleted){
      console.log("Camme Here")
      const d={
        name: this.name,
        points: this.points
      }
      const data={
        d: d        
      }
      this.conn.save(data).subscribe(res=>{
        console.log(res.message);
      },(error)=>{
        console.log(error);
      })
      this.dupCompleted=false;
    }
  }
  start():void {
    this.conn.getQuestions().subscribe(res => {
      console.log(res.message);
        this.questionList = res.message;
    })
  }
  nextQuestion() {
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
      this.dupCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        this.getProgressPercent();
      }, 1000);

      this.points -= 10;
    }
  }

  startCounter() {
    this.interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter === 0) {
          this.currentQuestion++;
          this.counter = 60;
          this.points -= 10;
        }
      });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.start();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercent() {
    this.progress = ((this.currentQuestion / this.questionList.length) * 100).toString();
    return this.progress;
  }

}
