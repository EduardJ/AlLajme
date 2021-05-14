import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KohaComponent } from './koha.component';

describe('KohaComponent', () => {
  let component: KohaComponent;
  let fixture: ComponentFixture<KohaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KohaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KohaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
