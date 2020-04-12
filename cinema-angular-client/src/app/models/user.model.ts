import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AbstractFormItem } from '../components/abstracts/abstract-form/abstract-form.directive'
import { FormInputComponent } from '../components/abstracts/abstract-form/form-input.component'
import { FormImageInputComponent } from '../components/abstracts/abstract-form/form-image-input.component'
import { FormSelectComponent } from '../components/abstracts/abstract-form/form-select.component'
import { IFormModel , FormModelParms, IModel } from './model'

export interface IUser extends IModel {
  id?: string
  email?: string
  name?: string
  accessLevel?: string
  password?: string
  image?: string;
}

export class UserModel implements IFormModel {

  public state: IUser = {};

  get id() {
    return this.state.id;
  }

  get email() {
    return this.state.email;
  }

  get name() {
    return this.state.name;
  }

  get accessLevel() {
    return this.state.accessLevel;
  }

  get password() {
    return this.state.password;
  }

  get image() {
    return this.state.image;
  }

  setId(id: string) {
    this.state.id = id;
  }

  setEmail(email: string) {
    this.state.email = email;
  }

  setName(name: string) {
    this.state.name = name;
  }

  setAccessLevel(accessLevel: string) {
    this.state.accessLevel = accessLevel;
  }

  setPassword(password: string) {
    this.state.password = password;
  }

  setImage(image: string) {
    this.state.image = image;
  }

  constructor(id: string, email: string, name: string, accessLevel: string, password: string, image: string) {
    this.setId(id);
    this.setEmail(email);
    this.setName(name);
    this.setAccessLevel(accessLevel);
    this.setPassword(password);
    this.setImage(image);
  }

  getFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.id),
      email: new FormControl(this.email, [Validators.required, Validators.email, Validators.maxLength(300)]),
      password: new FormControl(this.password, [Validators.required,Validators.minLength(8)]),
      image: new FormControl(this.image),
      name: new FormControl(this.name, [Validators.required,Validators.maxLength(300)]),
      accessLevel: new FormControl(this.accessLevel, [Validators.required])
    })
  }

  getFormItens(params: FormModelParms): any[] {
    let idItem = new AbstractFormItem(FormInputComponent, { title: "Id", name: "id", hidden: true })
    let imagemItem = new AbstractFormItem(FormImageInputComponent, { title: "Image", name: "image", placeholder: "Editar imagem do perfil" })
    let emailItem = new AbstractFormItem(FormInputComponent, { title: "Email", name: "email", placeholder: "ex@example.com", ws: params['ws'] })
    let nameItem = new AbstractFormItem(FormInputComponent, { title: "Nome", name: "name" })
    let passwordItem = new AbstractFormItem(FormInputComponent, { title: "Senha", name: "password", type: "password" })
    let typeItem = new AbstractFormItem(FormSelectComponent, {
      title: "Tipo de Usuario", name: "accessLevel", options: [
        { value: 'ROLE_ADMIN', viewValue: 'Gerente' },
        { value: 'ROLE_CLIENT', viewValue: 'Cliente' }
      ]
    })
    let forms = [imagemItem, idItem, emailItem, nameItem, passwordItem]
    if(params['client']){
      return forms;
    }else{
      forms.push(typeItem)
    }
    return forms
  }
}

