import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHolidayRequestComponent } from './edit-holiday-request.component';

describe('EditHolidayRequestComponent', () => {
  let component: EditHolidayRequestComponent;
  let fixture: ComponentFixture<EditHolidayRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHolidayRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHolidayRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
