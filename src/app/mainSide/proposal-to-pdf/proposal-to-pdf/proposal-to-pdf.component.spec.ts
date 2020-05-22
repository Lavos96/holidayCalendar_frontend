import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalToPdfComponent } from './proposal-to-pdf.component';

describe('ProposalToPdfComponent', () => {
  let component: ProposalToPdfComponent;
  let fixture: ComponentFixture<ProposalToPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalToPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalToPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
