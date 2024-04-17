import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgisterestudianteComponent } from './resgisterestudiante.component';

describe('ResgisterestudianteComponent', () => {
  let component: ResgisterestudianteComponent;
  let fixture: ComponentFixture<ResgisterestudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResgisterestudianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResgisterestudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
