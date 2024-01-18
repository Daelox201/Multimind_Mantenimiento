import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverComponent } from './mover.component';

describe('MoverComponent', () => {
  let component: MoverComponent;
  let fixture: ComponentFixture<MoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoverComponent]
    });
    fixture = TestBed.createComponent(MoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
