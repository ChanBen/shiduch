import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigbalaComponent } from './migbala.component';

describe('MigbalaComponent', () => {
  let component: MigbalaComponent;
  let fixture: ComponentFixture<MigbalaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigbalaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigbalaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
