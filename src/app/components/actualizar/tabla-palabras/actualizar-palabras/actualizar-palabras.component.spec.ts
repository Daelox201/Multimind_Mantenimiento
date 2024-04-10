import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPalabrasComponent } from './actualizar-palabras.component';

describe('ActualizarPalabrasComponent', () => {
  let component: ActualizarPalabrasComponent;
  let fixture: ComponentFixture<ActualizarPalabrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarPalabrasComponent]
    });
    fixture = TestBed.createComponent(ActualizarPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
