import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-bar',
  templateUrl: './score-bar.component.html',
  styleUrls: ['./score-bar.component.scss'],
})
export class ScoreBarComponent {
  @Input() playerOneScore: number;
  @Input() playerTwoScore: number;

  constructor() {}
}
