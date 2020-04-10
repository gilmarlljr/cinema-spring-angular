import { FormGroup } from '@angular/forms'
export interface IModel{

}

export interface IFormModel{
  getFormGroup(): FormGroup;
  getFormItens(params: FormModelParms): any[]
}

export declare type FormModelParms = {
  [key: string]: any;

};

export const WS_SERVICE_PARAM:string = 'wsService'
export const DISABLE_EMAIL:string = 'disableEmail'


