import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarCancionComponent } from './modificar-cancion.component';

describe('ModificarCancionComponent', () => {
  let component: ModificarCancionComponent;
  let fixture: ComponentFixture<ModificarCancionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarCancionComponent]
    });
    fixture = TestBed.createComponent(ModificarCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
