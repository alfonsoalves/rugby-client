import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureScoreListComponent } from './fixture-score-list.component';

describe('FixtureScoreListComponent', () => {
  let component: FixtureScoreListComponent;
  let fixture: ComponentFixture<FixtureScoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureScoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
