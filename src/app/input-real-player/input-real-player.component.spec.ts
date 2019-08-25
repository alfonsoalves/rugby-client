import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRealPlayerComponent } from './input-real-player.component';

describe('InputRealPlayerComponent', () => {
  let component: InputRealPlayerComponent;
  let fixture: ComponentFixture<InputRealPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputRealPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRealPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
