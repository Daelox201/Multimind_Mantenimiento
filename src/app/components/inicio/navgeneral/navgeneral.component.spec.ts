import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavgeneralComponent } from './navgeneral.component';

describe('NavgeneralComponent', () => {
  let component: NavgeneralComponent;
  let fixture: ComponentFixture<NavgeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavgeneralComponent]
    });
    fixture = TestBed.createComponent(NavgeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
