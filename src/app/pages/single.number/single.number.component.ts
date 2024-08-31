import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ItemCrossEventProps = { value: number; isCrossed: boolean };

@Component({
  selector: 'single-number-component',
  standalone: true,
  imports: [NgIf],
  templateUrl: './single.number.component.html',
  styleUrl: './single.number.component.css',
})
export class SingleNumberComponent {
  _value = 0;
  _isCrossed = false;
  @Output() itemCrossEvent = new EventEmitter<ItemCrossEventProps>();

  constructor() {}

  @Input()
  set value(val: number) {
    this._value = val;
  }

  @Input()
  set isCrossed(val: boolean) {
    this._isCrossed = val;
  }

  toggle() {
    this.itemCrossEvent.emit({
      value: this._value,
      isCrossed: !this._isCrossed,
    });
  }
}
