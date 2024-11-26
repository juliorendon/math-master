import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

import Utils from '../../utils/utils';

@Component({
  selector: 'app-money',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './money.component.html',
  styleUrl: './money.component.css'
})
export class MoneyComponent {

  // money stuff
  moneyArray: {image: string, answer: number}[] = [];
  moneyQuestion!: {image: string, answer: number};
  answerArray!: number[]
  correctAnswer!: number;
  playerAnswer!: boolean;

  @Output('moneyAnswerEvent') answerEvent = new EventEmitter<boolean>();

  ngOnInit() {
    this.loadMoneyArray();
    this.gameMoneyRoundStart();
  }

  gameMoneyRoundStart() {
    this.moneyQuestion = this.moneyArray[Utils.randomInt(0, 9)];

    this.correctAnswer = this.moneyQuestion.answer;
    var incorrectAnswer1 = this.correctAnswer + Utils.randomInt(1, 2);
    var incorrectAnswer2 = this.correctAnswer + Utils.randomInt(3, 4);

    this.answerArray = [];
    this.answerArray.push(this.correctAnswer, incorrectAnswer1, incorrectAnswer2);
    this.answerArray = Utils.shuffleArray(this.answerArray);
  }

  checkAnwser(answer: number) {
    if (answer === this.correctAnswer) {
      this.playerAnswer = true;
    } else {
      this.playerAnswer = false;
    }

    this.answerEvent.emit(this.playerAnswer);
    this.gameMoneyRoundStart();
  }

  private loadMoneyArray() {
    this.moneyArray.push({image: '/imgs/dinero_1.png', answer: 1.20});
    this.moneyArray.push({image: '/imgs/dinero_2.png', answer: 1.35});
    this.moneyArray.push({image: '/imgs/dinero_3.png', answer: 23});
    this.moneyArray.push({image: '/imgs/dinero_4.png', answer: 6.50});
    this.moneyArray.push({image: '/imgs/dinero_5.png', answer: 31.70});
    this.moneyArray.push({image: '/imgs/dinero_6.png', answer: 64});
    this.moneyArray.push({image: '/imgs/dinero_7.png', answer: 80});
    this.moneyArray.push({image: '/imgs/dinero_8.png', answer: 140});
    this.moneyArray.push({image: '/imgs/dinero_9.png', answer: 17.25});
    this.moneyArray.push({image: '/imgs/dinero_10.png', answer: 5.30});
  }

}
