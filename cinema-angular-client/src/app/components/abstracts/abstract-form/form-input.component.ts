import { Component, Input, OnInit } from '@angular/core';
import { AbstractFormComponent, AbstractFormParams } from './abstract-form.directive';
import { FormControl } from '@angular/forms';

@Component({
  template: `

      <mat-form-field fxFlex [style.visibility]="data.hidden? 'hidden': 'visible'">
        <mat-label>{{data.title}}</mat-label>
        <input matInput type="{{data.type}}" [formControl]="formControl" placeholder="{{data.placeholder}}"
        id="{{data.name}}" name="{{data.name}}" (focusout)="wsValid()">
        <mat-error *ngIf="formControl?.errors?.email && !formControl?.hasError('required')">
          Entre com um email valido
        </mat-error>
        <mat-error *ngIf="formControl?.errors?.minlength && !formControl?.hasError('required')">
          Informe pelo menos {{formControl?.errors.minlength.requiredLength}} carateres
        </mat-error>
        <mat-error *ngIf="formControl?.errors?.maxlength && !formControl?.hasError('required')">
          Informe no maximo {{formControl?.errors.maxlength.requiredLength}} carateres
        </mat-error>
        <mat-error *ngIf="formControl?.errors?.min && !formControl?.hasError('required')">
          Informe pelo menos {{formControl?.errors.min.min}}
        </mat-error>
        <mat-error *ngIf="formControl?.errors?.max && !formControl?.hasError('required')">
          Informe no maximo {{formControl?.errors.max.max}}
        </mat-error>
        <mat-error *ngIf="formControl?.errors?.wsError">
        Já existe um registro com esse {{data.title}}
        </mat-error>
        <mat-error *ngIf="formControl?.errors?.required">
          {{data.title}} é obrigatorio
        </mat-error>
        <mat-icon matSuffix *ngIf="formControl?.valid && data.ws">check</mat-icon>
      </mat-form-field>

  `
})

export class FormInputComponent implements AbstractFormComponent, OnInit {
  initialValue: any
  ngOnInit(): void {
    this.initialValue = this.formControl.value;
  }
  @Input() formControl: FormControl;
  @Input() data: AbstractFormParams;

  wsValid() {
    if (this.initialValue != this.formControl.value) {
      this.data.ws?.get(this.formControl.value).subscribe(res => {
        console.log(res)
        if (res.data) {
          this.formControl.setErrors({ 'wsError': true });
        }
      })
    }
  }
}
