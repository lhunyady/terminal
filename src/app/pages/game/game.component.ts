import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NumberSelectorComponent } from '../number.selector/number.selector.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgFor } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    HeaderComponent,
    NumberSelectorComponent,
    NzGridModule,
    NzButtonModule,
    NzModalModule,
    NgFor,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  size: NzButtonSize = 'large';
  isVisible: boolean = false;
  messages: string[] = [];
  @ViewChildren(NumberSelectorComponent)
  numberSelectorComponent!: QueryList<NumberSelectorComponent>;

  showModal(): void {
    this.calculateMessages();
    this.isVisible = true;
  }

  calculateMessages() {
    this.messages = this.numberSelectorComponent
      .toArray()
      .map((iter, idx) => `Panel ${idx + 1}: ${this.mapToMessage(iter)}`);
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  mapToMessage(numberSelector: NumberSelectorComponent): string {
    const crossedNumbers = numberSelector.items.filter(
      (iter) => iter.isCrossed
    );
    if (crossedNumbers.length === 0) {
      return 'empty';
    }
    if (crossedNumbers.length > 6) {
      return `Error: Please remove ${crossedNumbers.length - 6}  mark(s)`;
    }

    if (crossedNumbers.length < 6) {
      return `Error: ${6 - crossedNumbers.length}  mark(s) are missing`;
    }

    return crossedNumbers.map((iter) => iter.value).join(',');
  }
}
