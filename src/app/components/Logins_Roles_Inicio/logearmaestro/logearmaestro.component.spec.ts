import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogearmaestroComponent } from './logearmaestro.component';

describe('LogearmaestroComponent', () => {
  let component: LogearmaestroComponent;
  let fixture: ComponentFixture<LogearmaestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogearmaestroComponent]
    });
    fixture = TestBed.createComponent(LogearmaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
