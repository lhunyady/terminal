import { Component } from '@angular/core';
import {
  ItemCrossEventProps,
  SingleNumberComponent,
} from '../single.number/single.number.component';
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

  itemCross(event: ItemCrossEventProps) {
    this.items[event.value - 1].isCrossed = event.isCrossed;
  }

  remove() {
    this.items = this.items.map((item) => ({ ...item, isCrossed: false }));
  }
  randomize() {
    this.remove();

    const generatedNumbers: number[] = [];

    while (generatedNumbers.length < 6) {
      const key = Math.floor(Math.random() * 49);
      if (!generatedNumbers.includes(key)) {
        this.items[key].isCrossed = true;
        generatedNumbers.push(key);
      }
    }
  }
}
