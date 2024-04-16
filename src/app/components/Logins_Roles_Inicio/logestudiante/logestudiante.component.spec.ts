import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogestudianteComponent } from './logestudiante.component';

describe('LogestudianteComponent', () => {
  let component: LogestudianteComponent; // Declara una variable para almacenar la instancia del componente
  let fixture: ComponentFixture<LogestudianteComponent>; // Declara una variable para almacenar el objeto ComponentFixture

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogestudianteComponent] // Configura el entorno de pruebas y declara el componente a probar
    });
    fixture = TestBed.createComponent(LogestudianteComponent); // Crea una instancia del componente y la almacena en 'fixture'
    component = fixture.componentInstance; // Asigna la instancia del componente a 'component' para usar en las pruebas
    fixture.detectChanges(); // Detecta cambios en el componente
  });

  it('should create', () => { // Define una prueba llamada 'should create'
    expect(component).toBeTruthy(); // Verifica si el componente se ha creado correctamente (si 'component' no es nulo)
  });
});
  