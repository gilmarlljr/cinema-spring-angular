import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog.component';
import { AbstractWebService } from 'src/app/services/http/web.service';
import { FormModalComponent } from '../dialog/form-modal.component';
import { ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFormModel, IModel, FormModelParms } from 'src/app/models/model';

export abstract class AbstractDashboard<D extends IFormModel, I extends IModel> {


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<D>;

  constructor(public ws: AbstractWebService<I>,
    public changeDetectorRefs: ChangeDetectorRef,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) {
    this.ws.role = 'admin'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  abstract customFilter()
  abstract convertIModel(dto: I): D
  abstract convertIModelArray(dto: I[]): D[]


  list() {
    this.ws.getAll().subscribe(res => {
      let formModels: D[] = this.convertIModelArray(res.data)
      this.dataSource = new MatTableDataSource(formModels)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.paginator._changePageSize(10)
      this.customFilter()
      this.changeDetectorRefs.detectChanges();
    },
      err => {
        this.router.navigate(['login']);
      }
    )
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 4000, verticalPosition: 'top' });
  }

  openConfirmDialog(title: string, content: string): any {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title,
        content
      }
    });

    return dialogRef.afterClosed()
  }

  openFormDialog(title: string, formModel: D, formModelParms: FormModelParms): any {
    let formItens = formModel.getFormItens(formModelParms)
    let formGroup = formModel.getFormGroup()
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '400px',
      data: {
        title,
        formItens: formItens,
        formGroup: formGroup
      }
    });
    return dialogRef.afterClosed()
  }

  abstract insertParms(): FormModelParms;
  abstract updateParms(): FormModelParms;

  new() {
    this.openFormDialog("Criar novo Usuario", this.convertIModel(<I>{}), this.insertParms()).subscribe(model => {
      if (model) {
        this.insertModel(model)
      }
    });
  }

  formModelParms

  insertModel(model: I) {
    this.ws.insert(model).subscribe(res => {
      this.openSnackBar("Usuario inserido")
      this.list();
    }, err => {
      this.openConfirmDialog("ERRO ao inserir o Usuario", err + ", Deseja tentar Novamente?").subscribe(tryAgain => {
        if (tryAgain) {
          this.insertModel(model)
        }
      });
    }
    )
  }

  update(id: string, formModel: D) {
    this.openFormDialog("Atualizar Usuario ", formModel, this.updateParms()).subscribe(formModel => {
      if (formModel) {
        this.updateModel(id, formModel)
      }
    });

  }

  updateModel(id: string, model: I) {
    this.ws.update(id, model).subscribe(res => {
      this.openSnackBar("Usuario atualizado")
      this.list()
    }, err => {
      this.openConfirmDialog("ERRO ao atualizar o Usuario", err + ", Deseja tentar Novamente?").subscribe(tryAgain => {
        if (tryAgain) {
          this.updateModel(id, model)
        }
      });
    })
  }

  remove(id: string) {
    this.openConfirmDialog("Remover Usuario", "Deseja remover o usuario ?").subscribe(remove => {
      if (remove) {
        this.deleteModel(id);
      }
    });
  }

  deleteModel(id: string) {
    this.ws.delete(id).subscribe(res => {
      this.openSnackBar("Usuario removido")
      this.list()
    }, err => {
      this.openConfirmDialog("ERRO ao remover o Usuario", err + ", Deseja tentar Novamente?").subscribe(tryAgain => {
        if (tryAgain) {
          this.deleteModel(id)
        }
      });
    })
  }
}
