import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginestComponent } from './loginest.component';

describe('LoginestComponent', () => {
  let component: LoginestComponent;
  let fixture: ComponentFixture<LoginestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginestComponent]
    });
    fixture = TestBed.createComponent(LoginestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
