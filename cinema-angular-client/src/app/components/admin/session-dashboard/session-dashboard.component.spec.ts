import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionDashboardComponent } from './session-dashboard.component';

describe('SessionDashboardComponent', () => {
  let component: SessionDashboardComponent;
  let fixture: ComponentFixture<SessionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
