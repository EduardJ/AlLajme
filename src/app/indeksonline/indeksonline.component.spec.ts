import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndeksonlineComponent } from './indeksonline.component';

describe('IndeksonlineComponent', () => {
  let component: IndeksonlineComponent;
  let fixture: ComponentFixture<IndeksonlineComponent>;

  beforeEach(async(() => {
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
