import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureAddedPopupComponent } from './fixture-added-popup.component';

describe('FixtureAddedPopupComponent', () => {
  let component: FixtureAddedPopupComponent;
  let fixture: ComponentFixture<FixtureAddedPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureAddedPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureAddedPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
