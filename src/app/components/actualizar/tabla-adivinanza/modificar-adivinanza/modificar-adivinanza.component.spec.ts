import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarAdivinanzaComponent } from './modificar-adivinanza.component';

describe('ModificarAdivinanzaComponent', () => {
  let component: ModificarAdivinanzaComponent;
  let fixture: ComponentFixture<ModificarAdivinanzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarAdivinanzaComponent]
    });
    fixture = TestBed.createComponent(ModificarAdivinanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
