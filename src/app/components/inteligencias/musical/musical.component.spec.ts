import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicalComponent } from './musical.component';

describe('MusicalComponent', () => {
  let component: MusicalComponent;
  let fixture: ComponentFixture<MusicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicalComponent]
    });
    fixture = TestBed.createComponent(MusicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
