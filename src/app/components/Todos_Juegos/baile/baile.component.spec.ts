import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaileComponent } from './baile.component';

describe('BaileComponent', () => {
  let component: BaileComponent;
  let fixture: ComponentFixture<BaileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaileComponent]
    });
    fixture = TestBed.createComponent(BaileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
