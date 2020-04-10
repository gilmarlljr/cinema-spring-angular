import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AbstractFormItem } from '../components/abstracts/abstract-form/abstract-form.directive'
import { FormInputComponent } from '../components/abstracts/abstract-form/form-input.component'
import { FormImageInputComponent } from '../components/abstracts/abstract-form/form-image-input.component'
import { FormSelectComponent } from '../components/abstracts/abstract-form/form-select.component'
import { IFormModel, FormModelParms, IModel } from './model'

export interface IRoom extends IModel {
  id?: string
  name?: string
  chairs?: number
}

export class RoomModel implements IFormModel {

  public state: IRoom = {};

  get id() {
    return this.state.id;
  }

  get name() {
    return this.state.name;
  }

  get chairs() {
    return this.state.chairs;
  }

  setId(id: string) {
    this.state.id = id;
  }

  setName(name: string) {
    this.state.name = name;
  }

  setChairs(chairs: number) {
    this.state.chairs = chairs;
  }

  constructor(id: string, name: string, chairs: number) {
    this.setId(id);
    this.setName(name);
    this.setChairs(chairs);
  }

  getFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      name: new FormControl(this.name, [Validators.required, Validators.maxLength(300)]),
      chairs: new FormControl(this.chairs, [Validators.required, Validators.max(100), Validators.min(100)])
    })
  }

  getFormItens(params: FormModelParms): any[] {
    let id = new AbstractFormItem(FormInputComponent, { title: "Id", name: "id", hidden: true })
    let name = new AbstractFormItem(FormInputComponent, { title: "Nome", name: "name" })
    let chairs = new AbstractFormItem(FormInputComponent, { title: "Cadeiras", name: "chairs", type: "number" })
    return [id, name, chairs]
  }
}

