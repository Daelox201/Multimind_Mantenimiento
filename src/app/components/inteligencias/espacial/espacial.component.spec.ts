import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspacialComponent } from './espacial.component';

describe('EspacialComponent', () => {
  let component: EspacialComponent;
  let fixture: ComponentFixture<EspacialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspacialComponent]
    });
    fixture = TestBed.createComponent(EspacialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
