import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablayoutubeComponent } from './tablayoutube.component';

describe('TablayoutubeComponent', () => {
  let component: TablayoutubeComponent;
  let fixture: ComponentFixture<TablayoutubeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablayoutubeComponent]
    });
    fixture = TestBed.createComponent(TablayoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
