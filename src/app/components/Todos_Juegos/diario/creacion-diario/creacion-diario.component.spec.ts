import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionDiarioComponent } from './creacion-diario.component';

describe('CreacionDiarioComponent', () => {
  let component: CreacionDiarioComponent;
  let fixture: ComponentFixture<CreacionDiarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreacionDiarioComponent]
    });
    fixture = TestBed.createComponent(CreacionDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
