import { Component, Input } from '@angular/core';
import { AbstractFormComponent } from './abstract-form.directive';
import { FormControl } from '@angular/forms';

@Component({
  template: `
  <mat-form-field fxFlex>
    <mat-label>{{data.title}}</mat-label>
    <mat-select [(value)]="data.selectedValue" [formControl]="formControl">
      <mat-option *ngFor="let option of data.options" [value]="option.value">
        {{option.viewValue}}
      </mat-option>
    </mat-select>
    <mat-error *ngIf="formControl.errors?.required">
    {{data.title}} é obrigatorio
    </mat-error>
  </mat-form-field>
  `
})

export class FormSelectComponent implements AbstractFormComponent {
  @Input() data: any;
  @Input() formControl: FormControl;
}
