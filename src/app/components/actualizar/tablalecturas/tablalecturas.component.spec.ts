import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablalecturasComponent } from './tablalecturas.component';

describe('TablalecturasComponent', () => {
  let component: TablalecturasComponent;
  let fixture: ComponentFixture<TablalecturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablalecturasComponent]
    });
    fixture = TestBed.createComponent(TablalecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
