import { Component } from '@angular/core';
import { SingleNumberComponent } from '../single.number/single.number.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'number-selector',
  standalone: true,
  imports: [SingleNumberComponent, NgFor],
  templateUrl: './number.selector.component.html',
  styleUrl: './number.selector.component.css',
})
export class NumberSelectorComponent {
  items = Array.from(Array(49).keys()).map((iter) => ({
    value: iter + 1,
    isCrossed: false,
  }));

  counter(i: number) {
    return new Array(i);
  }
}
