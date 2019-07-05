import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCandidateComponent } from './second-candidate.component';

describe('SecondCandidateComponent', () => {
  let component: SecondCandidateComponent;
  let fixture: ComponentFixture<SecondCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
