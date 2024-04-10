import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaldocenteComponent } from './principaldocente.component';

describe('PrincipaldocenteComponent', () => {
  let component: PrincipaldocenteComponent;
  let fixture: ComponentFixture<PrincipaldocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipaldocenteComponent]
    });
    fixture = TestBed.createComponent(PrincipaldocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
