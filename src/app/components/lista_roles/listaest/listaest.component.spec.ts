import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaestComponent } from './listaest.component';

describe('ListaestComponent', () => {
  let component: ListaestComponent;
  let fixture: ComponentFixture<ListaestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaestComponent]
    });
    fixture = TestBed.createComponent(ListaestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
