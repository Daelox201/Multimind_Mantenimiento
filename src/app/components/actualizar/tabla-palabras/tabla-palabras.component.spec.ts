import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPalabrasComponent } from './tabla-palabras.component';

describe('TablaPalabrasComponent', () => {
  let component: TablaPalabrasComponent;
  let fixture: ComponentFixture<TablaPalabrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaPalabrasComponent]
    });
    fixture = TestBed.createComponent(TablaPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
