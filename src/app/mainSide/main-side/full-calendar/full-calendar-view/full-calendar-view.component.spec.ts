import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCalendarViewComponent } from './full-calendar-view.component';

describe('FullCalendarViewComponent', () => {
  let component: FullCalendarViewComponent;
  let fixture: ComponentFixture<FullCalendarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullCalendarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCalendarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
