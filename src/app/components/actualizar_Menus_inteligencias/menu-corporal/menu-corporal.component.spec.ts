import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCorporalComponent } from './menu-corporal.component';

describe('MenuCorporalComponent', () => {
  let component: MenuCorporalComponent;
  let fixture: ComponentFixture<MenuCorporalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCorporalComponent]
    });
    fixture = TestBed.createComponent(MenuCorporalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
