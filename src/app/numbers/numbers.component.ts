import { Component, EventEmitter, Output } from '@angular/core';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [],
  templateUrl: './numbers.component.html',
  styleUrl: './numbers.component.css'
})
export class NumbersComponent {

    // math stuff
    min = 0;
    max = 49;
    correctAnswer!: number;
    answerArray!: number[]
    number1!: number;
    number2!: number;
    winner!: boolean;
    wrongCounter!: number;
    playerAnswer!: boolean;

    @Output('numbersAnswerEvent') answerEvent = new EventEmitter<boolean>();

    ngOnInit() {
      this.gameNumberRoundStart();
    }
  
    gameNumberRoundStart() {
      this.number1 = Utils.randomInt(this.min, this.max);
      this.number2 = Utils.randomInt(this.min, this.max);
      this.correctAnswer = this.number1 + this.number2;
      var incorrectAnswer1 = this.correctAnswer + Utils.randomInt(1, 2);
      var incorrectAnswer2 = this.correctAnswer - Utils.randomInt(1, 2);
  
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
      this.gameNumberRoundStart();
    }

}
