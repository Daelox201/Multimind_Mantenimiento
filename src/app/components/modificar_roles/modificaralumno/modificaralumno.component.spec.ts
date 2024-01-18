import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaralumnoComponent } from './modificaralumno.component';

describe('ModificaralumnoComponent', () => {
  let component: ModificaralumnoComponent;
  let fixture: ComponentFixture<ModificaralumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificaralumnoComponent]
    });
    fixture = TestBed.createComponent(ModificaralumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
