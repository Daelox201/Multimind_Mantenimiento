import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablapreguComponent } from './tablapregu.component';

describe('TablapreguComponent', () => {
  let component: TablapreguComponent;
  let fixture: ComponentFixture<TablapreguComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablapreguComponent]
    });
    fixture = TestBed.createComponent(TablapreguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
