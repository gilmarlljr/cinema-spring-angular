import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
interface DialogData {
  title: string
  content: string
}

@Component({
  template: `
  <h3>{{data.title}}</h3>
  <div mat-dialog-content>
    <div fxLayout="row wrap">
      <div fxFlex="100" fxLayout="column" style="padding: 5px;">
        <h3>{{data.content}}</h3>
      </div>
    </div>
  </div>
  <div fxLayout="row wrap">
    <div fxFlex="100" fxLayout="column" style="padding: 5px;">
      <button mat-button (click)="confirm(true)">Confirmar</button>
    </div>
  </div>
  <div fxLayout="row wrap">
    <div fxFlex="100" fxLayout="column" style="padding: 5px;">
      <button mat-button (click)="confirm(false)">Cancelar</button>
    </div>
  </div>
  `
})

export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  confirm(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
