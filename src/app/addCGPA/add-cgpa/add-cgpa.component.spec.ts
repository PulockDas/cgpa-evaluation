import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCGPAComponent } from './add-cgpa.component';

describe('AddCGPAComponent', () => {
  let component: AddCGPAComponent;
  let fixture: ComponentFixture<AddCGPAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCGPAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCGPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
