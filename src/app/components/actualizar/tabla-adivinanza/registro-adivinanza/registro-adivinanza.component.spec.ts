import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAdivinanzaComponent } from './registro-adivinanza.component';

describe('RegistroAdivinanzaComponent', () => {
  let component: RegistroAdivinanzaComponent;
  let fixture: ComponentFixture<RegistroAdivinanzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroAdivinanzaComponent]
    });
    fixture = TestBed.createComponent(RegistroAdivinanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
