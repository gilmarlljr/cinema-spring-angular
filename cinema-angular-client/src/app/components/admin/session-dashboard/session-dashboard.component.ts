import { Component, ChangeDetectorRef, OnInit} from '@angular/core';
import { AbstractDashboard } from '../../abstracts/abstract-dashboard/abstract-dashboard';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomainConverter } from 'src/app/models/domain';
import { SelectMenuService } from '../left-menu/left-menu.component';
import { FormModelParms } from 'src/app/models/model';
import { SessionModel, ISession } from 'src/app/models/session.model';
import { SessionService } from 'src/app/services/http/session/session.service';
import { UserService } from 'src/app/services/http/user/user.service';
import { RoomService } from 'src/app/services/http/room/room.service';
import { MovieService } from 'src/app/services/http/movie/movie.service';

@Component({
  selector: 'app-session-dashboard',
  templateUrl: './session-dashboard.component.html',
  styleUrls: ['./session-dashboard.component.css']
})
export class SessionDashboardComponent extends AbstractDashboard<SessionModel, ISession> implements OnInit {

  displayedColumns: string[] = ['dateTime', 'room', 'movie', 'menu'];
  constructor(public service: SessionService,
    public userService: UserService,
    public roomService: RoomService,
    public movieService: MovieService,
    public changeDetectorRefs: ChangeDetectorRef,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private selectMenuService: SelectMenuService, ) {
    super(service, changeDetectorRefs, router, dialog, snackBar);
    this.userService.role = this.ws.role
    this.roomService.role = this.ws.role
    this.movieService.role = this.ws.role
    this.list()
  }
  test = new Date()
  ngOnInit(): void {
    this.selectMenuService.emitChange('session')
  }
  customFilter() {
    this.dataSource.filterPredicate = (data: SessionModel, filterValue: string) =>
      data.movie.title.trim().toLowerCase().indexOf(filterValue) !== -1 ||
      data.room.name.trim().toLowerCase().indexOf(filterValue) !== -1
  }
  convertIModel(dto: ISession): SessionModel {
    return DomainConverter.fromDto(SessionModel, dto)
  }
  convertIModelArray(dto: ISession[]): SessionModel[] {
    return DomainConverter.fromArrayDto(SessionModel, dto)
  }
  insertParms(): FormModelParms {
    return { 'movieService': this.movieService, 'roomService': this.roomService, 'userService': this.userService, }
  }
  updateParms(): FormModelParms {
    return this.insertParms()
  }
}


