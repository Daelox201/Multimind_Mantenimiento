import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistropreguComponent } from './registropregu.component';

describe('RegistropreguComponent', () => {
  let component: RegistropreguComponent;
  let fixture: ComponentFixture<RegistropreguComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistropreguComponent]
    });
    fixture = TestBed.createComponent(RegistropreguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
