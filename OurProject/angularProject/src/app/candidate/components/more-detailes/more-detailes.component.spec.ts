import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreDetailesComponent } from './more-detailes.component';

describe('MoreDetailesComponent', () => {
  let component: MoreDetailesComponent;
  let fixture: ComponentFixture<MoreDetailesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreDetailesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
