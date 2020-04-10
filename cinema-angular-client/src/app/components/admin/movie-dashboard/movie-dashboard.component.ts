import { Component, ChangeDetectorRef, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovieService } from 'src/app/services/http/movie/movie.service';
import { MovieModel, IMovie } from 'src/app/models/movie.model';
import { AbstractDashboard } from '../../abstracts/abstract-dashboard/abstract-dashboard';
import { FormModelParms } from 'src/app/models/model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomainConverter } from 'src/app/models/domain';
import { SelectMenuService } from '../left-menu/left-menu.component';

@Component({
  selector: 'app-movie-dashboard',
  templateUrl: './movie-dashboard.component.html',
  styleUrls: ['./movie-dashboard.component.css']
})
export class MovieDashboardComponent extends AbstractDashboard<MovieModel, IMovie> implements OnInit {

  displayedColumns: string[] = ['title', 'duration', 'animationType', 'audioType', 'menu'];
  constructor(public service: MovieService,
    public changeDetectorRefs: ChangeDetectorRef,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private selectMenuService: SelectMenuService, ) {
    super(service, changeDetectorRefs, router, dialog, snackBar);
    this.list()
  }
  ngOnInit(): void {
    this.selectMenuService.emitChange('movie')
  }
  customFilter() {
    this.dataSource.filterPredicate = (data: MovieModel, filterValue: string) =>
      data.title.trim().toLowerCase().indexOf(filterValue) !== -1
  }
  convertIModel(dto: IMovie): MovieModel {
    return DomainConverter.fromDto(MovieModel, dto)
  }
  convertIModelArray(dto: IMovie[]): MovieModel[] {
    return DomainConverter.fromArrayDto(MovieModel, dto)
  }
  insertParms(): FormModelParms {
    return { 'ws': this.ws }
  }
  updateParms(): FormModelParms {
    return { 'ws': this.ws }
  }
}
