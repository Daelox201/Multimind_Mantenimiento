import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteligenciasComponent } from './inteligencias.component';

describe('InteligenciasComponent', () => {
  let component: InteligenciasComponent;
  let fixture: ComponentFixture<InteligenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteligenciasComponent]
    });
    fixture = TestBed.createComponent(InteligenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
