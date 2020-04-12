import { Component, OnInit, Inject, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AbstractFormDirective, AbstractFormItem } from '../abstract-form/abstract-form.directive';
import { FormGroup } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog.component';


interface DialogData {
  title: string
  formItens: AbstractFormItem[]
  formGroup: FormGroup
}

@Component({
  template: `
  <h3>{{data.title}}</h3>
  <form [formGroup]="data.formGroup" (ngSubmit)="onSubmit()">
    <div mat-dialog-content>
      <div fxLayout="row wrap">
        <div fxFlex="100" fxLayout="column" style="padding: 5px;">
          <ng-template abstract-form></ng-template>
        </div>
      </div>
    </div>

    <div fxLayout="row wrap">
      <div fxFlex="100" fxLayout="column" style="padding: 5px;">
        <button mat-button>Confirmar</button>
      </div>
    </div>
  </form>
  <div fxLayout="row wrap">
    <div fxFlex="100" fxLayout="column" style="padding: 5px;">
    <button mat-button (click)="close()">Cancelar</button>
  </div>
  `
})
export class FormModalComponent implements OnInit {


  @ViewChild(AbstractFormDirective, { static: true }) abstractForm: AbstractFormDirective;

  constructor(public dialogRef: MatDialogRef<FormModalComponent>, private componentFactoryResolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog) {
    this.dialogRef.disableClose = true;
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    const viewContainerRef = this.abstractForm.viewContainerRef;
    viewContainerRef.clear();
    this.abstractForm.createForm(this.componentFactoryResolver, this.data.formGroup, this.data.formItens);
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

  onSubmit() {
    if (this.data.formGroup.valid) {
      this.openConfirmDialog(this.data.title, "Deseja confirmar ?").subscribe(result => {
        if (result) {
          this.dialogRef.close(this.data.formGroup.value);
        }
      });
    }
  }
}
