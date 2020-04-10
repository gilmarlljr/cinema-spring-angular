import { Directive, ViewContainerRef, Type, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AbstractWebService } from 'src/app/services/http/web.service';

@Directive({
  selector: '[abstract-form]',
})
export class AbstractFormDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }


  createForm(componentFactoryResolver: ComponentFactoryResolver, formGroup: FormGroup, formsItem: AbstractFormItem[]) {
    this.viewContainerRef.clear();
    const itemRefs = []
    formsItem.forEach(item => {
      let itemRef = this.viewContainerRef.createComponent(componentFactoryResolver.resolveComponentFactory(item.component));
      (<AbstractFormComponent>itemRef.instance).data = item.data;
      (<AbstractFormComponent>itemRef.instance).formControl = <FormControl>formGroup.controls[item.data.name];
      itemRefs.push(itemRef);
    });
  }
}

export interface AbstractFormComponent {
  data: AbstractFormParams;
  formControl: FormControl;
}

export interface AbstractFormParams {
  title: string;
  name: string;
  type?: string
  placeholder?: string
  options?: any[]
  hidden?: boolean
  ws?: AbstractWebService<any>
}

export class AbstractFormItem {
  constructor(public component: Type<any>, public data: AbstractFormParams) { }
}
