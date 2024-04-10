import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPalabrasComponent } from './registro-palabras.component';

describe('RegistroPalabrasComponent', () => {
  let component: RegistroPalabrasComponent;
  let fixture: ComponentFixture<RegistroPalabrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPalabrasComponent]
    });
    fixture = TestBed.createComponent(RegistroPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
