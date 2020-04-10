import { Component, Input } from '@angular/core';
import { AbstractFormComponent } from './abstract-form.directive';
import { FormControl } from '@angular/forms';


@Component({
  template: `
  <mat-form-field fxFlex>
  <mat-label>{{data.title}}</mat-label>
  <input matInput [matDatepicker]="picker" [formControl]="formControl">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
  `
})

export class FormDatePickerComponent implements AbstractFormComponent {
  @Input() formControl: FormControl;
  @Input() data: any;
}
