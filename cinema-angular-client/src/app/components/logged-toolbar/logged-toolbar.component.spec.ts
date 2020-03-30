import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedToolbarComponent } from './logged-toolbar.component';

describe('LoggedToolbarComponent', () => {
  let component: LoggedToolbarComponent;
  let fixture: ComponentFixture<LoggedToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
