import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerStudentComponent } from './per-student.component';

describe('PerStudentComponent', () => {
  let component: PerStudentComponent;
  let fixture: ComponentFixture<PerStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
