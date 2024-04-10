import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraComponent } from './intra.component';

describe('IntraComponent', () => {
  let component: IntraComponent;
  let fixture: ComponentFixture<IntraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntraComponent]
    });
    fixture = TestBed.createComponent(IntraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
