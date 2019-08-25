import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureScoreDisplayComponent } from './fixture-score-display.component';

describe('FixtureScoreDisplayComponent', () => {
  let component: FixtureScoreDisplayComponent;
  let fixture: ComponentFixture<FixtureScoreDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureScoreDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureScoreDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
