import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { AbstractFormComponent, AbstractFormParams } from './abstract-form.directive';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  template: `
  <div fxLayout="row wrap" style="margin-bottom: 10px;">
    <span fxFlex="30"></span>
    <div fxFlex="30" fxLayout="column" style="padding: 5px;">
      <ngx-avatar size="120" name="Image" src="{{formControl?.value}}"></ngx-avatar>
    </div>
  </div>
  <mat-form-field style="width: 100%;">
    <ngx-mat-file-input valuePlaceholder="{{selectedImage}}" placeholder="{{data.placeholder}}" [accept]="'.jpg,.png'"
    (change)="picked($event)"
    ></ngx-mat-file-input>
    <mat-icon matSuffix>folder</mat-icon>
  </mat-form-field>
  `
})

export class FormImageInputComponent implements AbstractFormComponent {

  @Input() data: AbstractFormParams;
  @Input() formControl: FormControl;

selectedImage = ''
  public picked(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.handleInputChange(file);
    }
    else {
      alert("No file selected");
    }
  }



  handleInputChange(file) {
    this.selectedImage = file.name
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    this.formControl.setValue("data:image/jpeg;base64," +base64result);

  }


}
