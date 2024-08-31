import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'single-number-component',
  standalone: true,
  imports: [NgIf],
  templateUrl: './single.number.component.html',
  styleUrl: './single.number.component.css',
})
export class SingleNumberComponent {
  @Input() value = 0;
  @Input() isCrossed = false;

  constructor() {}

  toggle() {
    this.isCrossed = !this.isCrossed;
  }
}
