import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSuggestsComponent } from './all-suggests.component';

describe('AllSuggestsComponent', () => {
  let component: AllSuggestsComponent;
  let fixture: ComponentFixture<AllSuggestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSuggestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSuggestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
