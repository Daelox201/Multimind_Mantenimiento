import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrovideoComponent } from './registrovideo.component';

describe('RegistrovideoComponent', () => {
  let component: RegistrovideoComponent;
  let fixture: ComponentFixture<RegistrovideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrovideoComponent]
    });
    fixture = TestBed.createComponent(RegistrovideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
