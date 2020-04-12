import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { AbstractFormComponent } from './abstract-form.directive';
import { FormControl } from '@angular/forms';
import { LocalePipe, DateFormatPipe } from 'ngx-moment';

@Component({
  template: `
  <mat-form-field fxFlex>
      <input matInput [ngxMatDatetimePicker]="picker1"
      placeholder="{{data.title}}" [formControl]="formControl" [min]="minDate" >
      <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
      <ngx-mat-datetime-picker #picker1></ngx-mat-datetime-picker>
  </mat-form-field>
  `
})

export class FormDatePickerComponent implements AbstractFormComponent {

  @Input() formControl: FormControl;
  @Input() data: any;
  minDate: Date = new Date();

}
