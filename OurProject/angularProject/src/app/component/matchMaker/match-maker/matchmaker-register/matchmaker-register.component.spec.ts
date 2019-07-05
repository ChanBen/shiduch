import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchmakerRegisterComponent } from './matchmaker-register.component';

describe('MatchmakerRegisterComponent', () => {
  let component: MatchmakerRegisterComponent;
  let fixture: ComponentFixture<MatchmakerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchmakerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchmakerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
