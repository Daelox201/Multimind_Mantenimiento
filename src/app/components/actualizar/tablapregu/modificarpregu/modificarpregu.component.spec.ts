import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarpreguComponent } from './modificarpregu.component';

describe('ModificarpreguComponent', () => {
  let component: ModificarpreguComponent;
  let fixture: ComponentFixture<ModificarpreguComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarpreguComponent]
    });
    fixture = TestBed.createComponent(ModificarpreguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
