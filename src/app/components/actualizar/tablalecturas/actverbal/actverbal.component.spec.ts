import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActverbalComponent } from './actverbal.component';

describe('ActverbalComponent', () => {
  let component: ActverbalComponent;
  let fixture: ComponentFixture<ActverbalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActverbalComponent]
    });
    fixture = TestBed.createComponent(ActverbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
