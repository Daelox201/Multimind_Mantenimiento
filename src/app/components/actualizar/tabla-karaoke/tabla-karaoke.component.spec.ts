import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaKaraokeComponent } from './tabla-karaoke.component';

describe('TablaKaraokeComponent', () => {
  let component: TablaKaraokeComponent;
  let fixture: ComponentFixture<TablaKaraokeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaKaraokeComponent]
    });
    fixture = TestBed.createComponent(TablaKaraokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
