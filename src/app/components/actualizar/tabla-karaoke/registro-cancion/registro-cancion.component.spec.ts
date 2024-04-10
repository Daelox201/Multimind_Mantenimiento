import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCancionComponent } from './registro-cancion.component';

describe('RegistroCancionComponent', () => {
  let component: RegistroCancionComponent;
  let fixture: ComponentFixture<RegistroCancionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroCancionComponent]
    });
    fixture = TestBed.createComponent(RegistroCancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
