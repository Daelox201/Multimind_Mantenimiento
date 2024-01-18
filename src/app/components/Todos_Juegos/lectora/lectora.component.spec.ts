import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectoraComponent } from './lectora.component';

describe('LectoraComponent', () => {
  let component: LectoraComponent;
  let fixture: ComponentFixture<LectoraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectoraComponent]
    });
    fixture = TestBed.createComponent(LectoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
