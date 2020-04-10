import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  searchValue = '';
  displayedColumns: string[] = ['position', 'name', 'weight'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.breakpointObserver.observe(Breakpoints.Handset)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.paginator._changePageSize(5)
          this.changeDetectorRefs.detectChanges();
        } else {
          this.paginator._changePageSize(10)
          this.changeDetectorRefs.detectChanges();
        }
      });
  }
  constructor(public breakpointObserver: BreakpointObserver, public changeDetectorRefs: ChangeDetectorRef) { }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079 },
  { position: 2, name: 'Helium', weight: 4.0026 },
  { position: 3, name: 'Lithium', weight: 6.941 },
  { position: 4, name: 'Beryllium', weight: 9.0122 },
  { position: 5, name: 'Boron', weight: 10.811 },
  { position: 6, name: 'Carbon', weight: 12.0107 },
  { position: 7, name: 'Nitrogen', weight: 14.0067 },
  { position: 8, name: 'Oxygen', weight: 15.9994 },
  { position: 9, name: 'Fluorine', weight: 18.9984 },
  { position: 10, name: 'Neon', weight: 20.1797 },
  { position: 11, name: 'Hydrogen', weight: 1.0079 },
  { position: 12, name: 'Helium', weight: 4.0026 },
  { position: 13, name: 'Lithium', weight: 6.941 },
  { position: 14, name: 'Beryllium', weight: 9.0122 },
  { position: 15, name: 'Boron', weight: 10.811 },
  { position: 16, name: 'Carbon', weight: 12.0107 },
  { position: 17, name: 'Nitrogen', weight: 14.0067 },
  { position: 18, name: 'Oxygen', weight: 15.9994 },
  { position: 19, name: 'Fluorine', weight: 18.9984 },
  { position: 20, name: 'Neon', weight: 20.1797 }
];





