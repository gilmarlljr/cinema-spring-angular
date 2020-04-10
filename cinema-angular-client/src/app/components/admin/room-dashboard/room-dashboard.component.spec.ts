import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDashboardComponent } from './room-dashboard.component';

describe('RoomDashboardComponent', () => {
  let component: RoomDashboardComponent;
  let fixture: ComponentFixture<RoomDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
