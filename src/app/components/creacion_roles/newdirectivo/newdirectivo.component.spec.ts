import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdirectivoComponent } from './newdirectivo.component';

describe('NewdirectivoComponent', () => {
  let component: NewdirectivoComponent;
  let fixture: ComponentFixture<NewdirectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewdirectivoComponent]
    });
    fixture = TestBed.createComponent(NewdirectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
