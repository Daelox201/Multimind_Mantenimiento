import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMusicalComponent } from './menu-musical.component';

describe('MenuMusicalComponent', () => {
  let component: MenuMusicalComponent;
  let fixture: ComponentFixture<MenuMusicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuMusicalComponent]
    });
    fixture = TestBed.createComponent(MenuMusicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
