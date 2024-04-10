import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmaestroComponent } from './newmaestro.component';

describe('NewmaestroComponent', () => {
  let component: NewmaestroComponent;
  let fixture: ComponentFixture<NewmaestroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewmaestroComponent]
    });
    fixture = TestBed.createComponent(NewmaestroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
