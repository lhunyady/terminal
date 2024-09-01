import { Component, Input } from '@angular/core';
import {
  ItemCrossEventProps,
  SingleNumberComponent,
} from '../single.number/single.number.component';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

type GeneratedResponse = { numbers: number[] };

@Component({
  selector: 'number-selector',
  standalone: true,
  imports: [SingleNumberComponent, NgFor],
  templateUrl: './number.selector.component.html',
  styleUrl: './number.selector.component.css',
})
export class NumberSelectorComponent {
  backgroundClass = '';
  items = Array.from(Array(49).keys()).map((iter) => ({
    value: iter + 1,
    isCrossed: false,
  }));

  @Input()
  set backgroundClassIdx(val: number) {
    this.backgroundClass = `number-field-${val}`;
  }

  itemCross(event: ItemCrossEventProps) {
    this.items[event.value - 1].isCrossed = event.isCrossed;
  }

  remove() {
    //We could create a map that would act as a lookup
    //on where the isCrossed numbers are in the items array,
    //but that would bring in additional complexity with synchronization
    //since we only have 49 elements it is not a cpu intensive
    //task to iterate through these and set every isCrossed to false.
    this.items = this.items.map((item) => ({ ...item, isCrossed: false }));
  }
  randomize() {
    this.remove();

    this.http
      //FIXME URL should atleast be in a properties file.
      .get<GeneratedResponse>('http://localhost:8080/v1/generate')
      .subscribe((res) => {
        res.numbers.forEach((number) => (this.items[number].isCrossed = true));
      });
  }

  constructor(private http: HttpClient) {}
}
