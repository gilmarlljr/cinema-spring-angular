import { Component, ChangeDetectorRef, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { UserService } from 'src/app/services/http/user/user.service';
import { UserModel, IUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomainConverter } from 'src/app/models/domain';
import { AbstractDashboard } from '../../abstracts/abstract-dashboard/abstract-dashboard';
import { FormModelParms } from 'src/app/models/model';
import { SelectMenuService } from '../left-menu/left-menu.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent extends AbstractDashboard<UserModel, IUser> implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'accessLevel', 'menu'];
  constructor(public service: UserService,
    public changeDetectorRefs: ChangeDetectorRef,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private selectMenuService: SelectMenuService, ) {
    super(service, changeDetectorRefs, router, dialog, snackBar);
    this.list()
  }
  ngOnInit(): void {
    this.selectMenuService.emitChange('user')
  }
  customFilter() {
    this.dataSource.filterPredicate = (data: UserModel, filterValue: string) => data.name.trim().toLowerCase().indexOf(filterValue) !== -1 || data.email.trim().toLowerCase().indexOf(filterValue) !== -1;
  }
  convertIModel(dto: IUser): UserModel {
    return DomainConverter.fromDto<UserModel>(UserModel, dto)
  }
  convertIModelArray(dto: IUser[]): UserModel[] {
    return DomainConverter.fromArrayDto<UserModel>(UserModel, dto)
  }
  insertParms(): FormModelParms {
    return { 'ws': this.ws }
  }
  updateParms(): FormModelParms {
    return { 'ws': this.ws }
  }
}
