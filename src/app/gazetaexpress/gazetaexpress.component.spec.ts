import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GazetaexpressComponent } from './gazetaexpress.component';

describe('GazetaexpressComponent', () => {
  let component: GazetaexpressComponent;
  let fixture: ComponentFixture<GazetaexpressComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GazetaexpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GazetaexpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
