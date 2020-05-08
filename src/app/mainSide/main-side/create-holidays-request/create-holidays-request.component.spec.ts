import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHolidaysRequestComponent } from './create-holidays-request.component';

describe('CreateHolidaysRequestComponent', () => {
  let component: CreateHolidaysRequestComponent;
  let fixture: ComponentFixture<CreateHolidaysRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHolidaysRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHolidaysRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
