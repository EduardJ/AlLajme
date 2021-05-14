import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TelegrafiComponent } from './telegrafi.component';

describe('TelegrafiComponent', () => {
  let component: TelegrafiComponent;
  let fixture: ComponentFixture<TelegrafiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegrafiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegrafiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
