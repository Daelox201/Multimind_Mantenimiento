import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalestudianteComponent } from './principalestudiante.component';

describe('PrincipalestudianteComponent', () => {
  let component: PrincipalestudianteComponent;
  let fixture: ComponentFixture<PrincipalestudianteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalestudianteComponent]
    });
    fixture = TestBed.createComponent(PrincipalestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
