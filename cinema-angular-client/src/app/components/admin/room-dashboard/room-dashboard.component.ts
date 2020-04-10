import { Component, ChangeDetectorRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractDashboard } from '../../abstracts/abstract-dashboard/abstract-dashboard';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomainConverter } from 'src/app/models/domain';
import { SelectMenuService } from '../left-menu/left-menu.component';
import { FormModelParms } from 'src/app/models/model';
import { RoomModel, IRoom } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/http/room/room.service';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.css']
})
export class RoomDashboardComponent extends AbstractDashboard<RoomModel, IRoom> implements OnInit {

  displayedColumns: string[] = ['name', 'chairs', 'menu'];
  constructor(public service: RoomService,
    public changeDetectorRefs: ChangeDetectorRef,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private selectMenuService: SelectMenuService, ) {
    super(service, changeDetectorRefs, router, dialog, snackBar);
    this.list()
  }
  ngOnInit(): void {
    this.selectMenuService.emitChange('room')
  }
  customFilter() {
    this.dataSource.filterPredicate = (data: RoomModel, filterValue: string) =>
      data.name.trim().toLowerCase().indexOf(filterValue) !== -1
  }
  convertIModel(dto: IRoom): RoomModel {
    return DomainConverter.fromDto(RoomModel, dto)
  }
  convertIModelArray(dto: IRoom[]): RoomModel[] {
    return DomainConverter.fromArrayDto(RoomModel, dto)
  }
  insertParms(): FormModelParms {
    return { 'ws': this.ws }
  }
  updateParms(): FormModelParms {
    return { 'ws': this.ws }
  }
}
