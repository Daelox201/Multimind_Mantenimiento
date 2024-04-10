import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadirectivosComponent } from './listadirectivos.component';

describe('ListadirectivosComponent', () => {
  let component: ListadirectivosComponent;
  let fixture: ComponentFixture<ListadirectivosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadirectivosComponent]
    });
    fixture = TestBed.createComponent(ListadirectivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
