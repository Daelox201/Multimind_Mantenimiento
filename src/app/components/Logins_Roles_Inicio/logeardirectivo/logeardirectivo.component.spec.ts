import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogeardirectivoComponent } from './logeardirectivo.component';

describe('LogeardirectivoComponent', () => {
  let component: LogeardirectivoComponent;
  let fixture: ComponentFixture<LogeardirectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogeardirectivoComponent]
    });
    fixture = TestBed.createComponent(LogeardirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
