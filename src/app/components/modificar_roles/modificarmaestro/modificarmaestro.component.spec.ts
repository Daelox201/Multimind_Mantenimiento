import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarmaestroComponent } from './modificarmaestro.component';

describe('ModificarmaestroComponent', () => {
  let component: ModificarmaestroComponent;
  let fixture: ComponentFixture<ModificarmaestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarmaestroComponent]
    });
    fixture = TestBed.createComponent(ModificarmaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
