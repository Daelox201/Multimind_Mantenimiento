import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInterpersonalComponent } from './menu-interpersonal.component';

describe('MenuInterpersonalComponent', () => {
  let component: MenuInterpersonalComponent;
  let fixture: ComponentFixture<MenuInterpersonalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuInterpersonalComponent]
    });
    fixture = TestBed.createComponent(MenuInterpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
