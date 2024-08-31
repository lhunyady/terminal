import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleNumberComponent } from './single.number.component';

describe('SingleNumberComponent', () => {
  let component: SingleNumberComponent;
  let fixture: ComponentFixture<SingleNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
