import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinesComponent } from './busines.component';

describe('BusinesComponent', () => {
  let component: BusinesComponent;
  let fixture: ComponentFixture<BusinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
