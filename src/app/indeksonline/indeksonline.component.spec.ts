import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IndeksonlineComponent } from './indeksonline.component';

describe('IndeksonlineComponent', () => {
  let component: IndeksonlineComponent;
  let fixture: ComponentFixture<IndeksonlineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IndeksonlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndeksonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
