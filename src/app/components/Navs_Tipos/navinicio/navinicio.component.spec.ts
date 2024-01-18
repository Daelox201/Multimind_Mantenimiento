import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavinicioComponent } from './navinicio.component';

describe('NavinicioComponent', () => {
  let component: NavinicioComponent;
  let fixture: ComponentFixture<NavinicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavinicioComponent]
    });
    fixture = TestBed.createComponent(NavinicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
