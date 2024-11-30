import { Component } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SidebarModule } from 'primeng/sidebar';
import { MessageService } from 'primeng/api';
import { Howl } from 'howler';
import { CommonModule } from '@angular/common';

import Utils from '../utils/utils';
import { MoneyComponent } from './money/money.component';
import { NumbersComponent } from './numbers/numbers.component';
import { CompareComponent } from './compare/compare.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    ProgressBarModule, 
    ToastModule, 
    SidebarModule, 
    NumbersComponent, 
    MoneyComponent, 
    CompareComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService]
})
export class AppComponent {
  constructor(private messageService: MessageService) {}

  title = 'math-master';
  logo = '/imgs/logo_1.png';
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

  modeNumbers!: boolean;
  modeMoney!: boolean;
  modeCompare!: boolean;
  winner!: boolean;
  wrongCounter!: number;
  laugh!: boolean;

  gameMode!: number;

  ngOnInit() {
    this.logo = `/imgs/logo_${Utils.randomInt(1, 3)}.jpg`;
    this.progressBar = 0;
    this.wrongCounter = 0;
    this.gameRoundSwitch();
    this.winner = false;
    this.laugh = false;

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

  gameRoundSwitch() {
    this.gameMode = Utils.randomInt(0,2);

    if(this.gameMode === 0) {
      this.modeNumbers = true;
      this.modeMoney = false;
      this.modeCompare = false;
    } else if (this.gameMode === 1) {
      this.modeNumbers = false;
      this.modeMoney = true;
      this.modeCompare = false;
    } else {
      this.modeNumbers = false;
      this.modeMoney = false;
      this.modeCompare = true;
    }
  }

  checkAnwser(answer: boolean) {
    if (answer) {
      this.correctSound.play();
      this.messageService.add({ severity: 'success', summary: 'Correct', detail:  '✔️🤩 Gut gemacht!' });
      this.progressBar = this.progressBar + 10;
    } else {
      this.wrongAnswerSound.play();
      this.messageService.add({ severity: 'error', summary: 'Wrong Answer', detail: " ❌😵  Ups! Nächstes Mal besser" });
      this.progressBar === 0? this.progressBar = 0 : this.progressBar = this.progressBar - 10;
      this.wrongCounter = this.wrongCounter + 1;
    }

    if(this.wrongCounter === 3) {
      this.youLooseSound.play();
      this.wrongCounter = 0;
      this.laugh = true;
    }

    if(this.progressBar === 100) {
      this.winner = true;
      this.youWinSound.play();
    } else {
      this.gameRoundSwitch();
    }
  }

  resetGame() {
    this.progressBar = 0;
    this.winner = false;
    this.laugh = false;
    this.wrongCounter = 0;
  }

  // Numbers
  getNumbersAnswer(answer: boolean) {
    console.log('Numbers Answer: ', answer);
    this.checkAnwser(answer);
  }

  // Money
  getMoneyAnswer(answer: boolean) {
    console.log('Money Answer: ', answer);
    this.checkAnwser(answer);
  }

  getCompareAnswer(answer: boolean) {
    console.log('Compare Answer: ', answer);
    this.checkAnwser(answer);
  }

}
