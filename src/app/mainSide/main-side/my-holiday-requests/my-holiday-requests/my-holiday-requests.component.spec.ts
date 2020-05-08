import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHolidayRequestsComponent } from './my-holiday-requests.component';

describe('MyHolidayRequestsComponent', () => {
  let component: MyHolidayRequestsComponent;
  let fixture: ComponentFixture<MyHolidayRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHolidayRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHolidayRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
