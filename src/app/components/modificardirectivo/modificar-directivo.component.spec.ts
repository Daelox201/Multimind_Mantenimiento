import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDirectivoComponent } from './modificar-directivo.component';

describe('ModificarDirectivoComponent', () => {
  let component: ModificarDirectivoComponent;
  let fixture: ComponentFixture<ModificarDirectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarDirectivoComponent]
    });
    fixture = TestBed.createComponent(ModificarDirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
