import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAdivinanzaComponent } from './tabla-adivinanza.component';

describe('TablaAdivinanzaComponent', () => {
  let component: TablaAdivinanzaComponent;
  let fixture: ComponentFixture<TablaAdivinanzaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaAdivinanzaComponent]
    });
    fixture = TestBed.createComponent(TablaAdivinanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
