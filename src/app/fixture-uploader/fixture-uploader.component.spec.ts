import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureUploaderComponent } from './fixture-uploader.component';

describe('FixtureUploaderComponent', () => {
  let component: FixtureUploaderComponent;
  let fixture: ComponentFixture<FixtureUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
