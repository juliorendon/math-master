import { Component, EventEmitter, Output } from '@angular/core';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent {

  min = 0;
  max = 100;
  correctAnswer!: string;
  answerArray!: string[]
  number1!: number;
  number2!: number;
  playerAnswer!: boolean;

  @Output('compareAnswerEvent') answerEvent = new EventEmitter<boolean>();

  ngOnInit() {
    this.gameCompareRoundStart();
  }

  gameCompareRoundStart() {
    this.number1 = Utils.randomInt(this.min, this.max);
    this.number2 = Utils.randomInt(this.min, this.max);
    this.correctAnswer = this.number1 > this.number2 ? '>' : this.number2 > this.number1 ? '<' : '=';
    var answer1 = '>';
    var answer2 = '<';
    var answer3 = '=';
    this.answerArray = [];
    this.answerArray.push(answer1, answer2, answer3);
  }

  checkAnwser(answer: string) {
    if (answer === this.correctAnswer) {
      this.playerAnswer = true;
    } else {
      this.playerAnswer = false;
    }

    this.answerEvent.emit(this.playerAnswer);
    this.gameCompareRoundStart();
  }

}
