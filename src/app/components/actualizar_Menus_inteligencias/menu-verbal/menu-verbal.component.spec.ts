import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuVerbalComponent } from './menu-verbal.component';

describe('MenuVerbalComponent', () => {
  let component: MenuVerbalComponent;
  let fixture: ComponentFixture<MenuVerbalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuVerbalComponent]
    });
    fixture = TestBed.createComponent(MenuVerbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
