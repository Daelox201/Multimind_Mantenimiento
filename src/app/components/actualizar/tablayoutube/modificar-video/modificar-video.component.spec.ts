import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarVideoComponent } from './modificar-video.component';

describe('ModificarVideoComponent', () => {
  let component: ModificarVideoComponent;
  let fixture: ComponentFixture<ModificarVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarVideoComponent]
    });
    fixture = TestBed.createComponent(ModificarVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
