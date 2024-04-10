import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificardirectivoComponent } from './modificardirectivo.component';

describe('ModificardirectivoComponent', () => {
  let component: ModificardirectivoComponent;
  let fixture: ComponentFixture<ModificardirectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificardirectivoComponent]
    });
    fixture = TestBed.createComponent(ModificardirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
