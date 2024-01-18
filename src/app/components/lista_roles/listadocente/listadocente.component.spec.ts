import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadocenteComponent } from './listadocente.component';

describe('ListadocenteComponent', () => {
  let component: ListadocenteComponent;
  let fixture: ComponentFixture<ListadocenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadocenteComponent]
    });
    fixture = TestBed.createComponent(ListadocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
