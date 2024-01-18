import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdivinaComponent } from './adivina.component';

describe('AdivinaComponent', () => {
  let component: AdivinaComponent;
  let fixture: ComponentFixture<AdivinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdivinaComponent]
    });
    fixture = TestBed.createComponent(AdivinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
