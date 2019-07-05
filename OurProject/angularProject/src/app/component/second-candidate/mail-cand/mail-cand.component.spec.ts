import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailCandComponent } from './mail-cand.component';

describe('MailCandComponent', () => {
  let component: MailCandComponent;
  let fixture: ComponentFixture<MailCandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailCandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailCandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
