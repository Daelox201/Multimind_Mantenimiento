import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogestudianteComponent } from './logestudiante.component';

describe('LogestudianteComponent', () => {
  let component: LogestudianteComponent;
  let fixture: ComponentFixture<LogestudianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogestudianteComponent]
    });
    fixture = TestBed.createComponent(LogestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
