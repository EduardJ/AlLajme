import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsajderComponent } from './insajder.component';

describe('InsajderComponent', () => {
  let component: InsajderComponent;
  let fixture: ComponentFixture<InsajderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsajderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsajderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
