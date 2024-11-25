import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { MessageService } from 'primeng/api';
import { Howl } from 'howler';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProgressBarModule, ToastModule, SidebarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  constructor(private messageService: MessageService) {}

  title = 'math-master';
  progressBar = 0;
  correctSound: any;
  wrongAnswerSound: any;
  youWinSound: any;
  youLooseSound: any;

  // sounds
  correct = '/sounds/correct.wav';
  wrongAsnwer = '/sounds/wrong_answer.wav';
  youWin = '/sounds/you_win.wav';
  youLoose = '/sounds/you_loose.wav';

  // math stuff
  min = 0;
  max = 49;
  correctAnswer!: number;
  answerArray!: number[]
  number1!: number;
  number2!: number;
  winner!: boolean;
  wrongCounter!: number;

  ngOnInit() {
    this.progressBar = 0;
    this.wrongCounter = 0;
    this.gameRoundStart();
    this.winner = false;

    this.correctSound =  new Howl({
      src: [this.correct]
    });

    this.wrongAnswerSound =  new Howl({
      src: [this.wrongAsnwer]
    });

    this.youWinSound =  new Howl({
      src: [this.youWin]
    });

    this.youLooseSound =  new Howl({
      src: [this.youLoose]
    });

  }

  gameRoundStart() {
    this.number1 = this.randomInt(this.min, this.max);
    this.number2 = this.randomInt(this.min, this.max);
    this.correctAnswer = this.number1 + this.number2;
    var incorrectAnswer1 = this.correctAnswer + this.randomInt(1, 2);
    var incorrectAnswer2 = this.correctAnswer - this.randomInt(1, 2);

    this.answerArray = [];
    this.answerArray.push(this.correctAnswer, incorrectAnswer1, incorrectAnswer2);
    this.answerArray = this.shuffleArray(this.answerArray);
  }

  checkAnwser(answer: number) {
    if (answer === this.correctAnswer) {
      this.correctSound.play();
      this.messageService.add({ severity: 'success', summary: 'Correct', detail: 'Good Work! 👍🏻' });
      this.progressBar = this.progressBar + 10;
    } else {
      this.wrongAnswerSound.play();
      this.messageService.add({ severity: 'error', summary: 'Wrong Answer', detail: "Sorry, try again 👎🏻" });
      this.progressBar === 0? this.progressBar = 0 : this.progressBar = this.progressBar - 10;
      this.wrongCounter = this.wrongCounter + 1;
    }

    if(this.wrongCounter === 3) {
      this.youLooseSound.play();
      this.wrongCounter = 0;
    }

    if(this.progressBar === 100) {
      this.winner = true;
      this.youWinSound.play();
    } else {
      this.gameRoundStart();
    }
  }

  resetGame() {
    this.progressBar = 0;
    this.winner = false;
    this.wrongCounter = 0;
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffleArray(array: number[]): number[] {
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }

}
