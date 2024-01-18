import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIntrapersonalComponent } from './menu-intrapersonal.component';

describe('MenuIntrapersonalComponent', () => {
  let component: MenuIntrapersonalComponent;
  let fixture: ComponentFixture<MenuIntrapersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuIntrapersonalComponent]
    });
    fixture = TestBed.createComponent(MenuIntrapersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
