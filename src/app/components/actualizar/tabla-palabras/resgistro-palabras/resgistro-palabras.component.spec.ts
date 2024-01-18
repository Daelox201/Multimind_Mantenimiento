import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistroPalabrasComponent } from './resgistro-palabras.component';

describe('ResgistroPalabrasComponent', () => {
  let component: ResgistroPalabrasComponent;
  let fixture: ComponentFixture<ResgistroPalabrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResgistroPalabrasComponent]
    });
    fixture = TestBed.createComponent(ResgistroPalabrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
