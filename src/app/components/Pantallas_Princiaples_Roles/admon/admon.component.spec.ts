import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmonComponent } from './admon.component';

describe('AdmonComponent', () => {
  let component: AdmonComponent;
  let fixture: ComponentFixture<AdmonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmonComponent]
    });
    fixture = TestBed.createComponent(AdmonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
