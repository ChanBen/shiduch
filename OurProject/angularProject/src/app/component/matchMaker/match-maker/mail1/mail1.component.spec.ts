import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Mail1Component } from './mail1.component';

describe('Mail1Component', () => {
  let component: Mail1Component;
  let fixture: ComponentFixture<Mail1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mail1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
