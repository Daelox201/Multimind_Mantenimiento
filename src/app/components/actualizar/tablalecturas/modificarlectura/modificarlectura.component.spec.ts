import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarlecturaComponent } from './modificarlectura.component';

describe('ModificarlecturaComponent', () => {
  let component: ModificarlecturaComponent;
  let fixture: ComponentFixture<ModificarlecturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarlecturaComponent]
    });
    fixture = TestBed.createComponent(ModificarlecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
