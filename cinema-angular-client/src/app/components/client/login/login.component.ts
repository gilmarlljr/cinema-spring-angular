import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AbstractFormDirective, AbstractFormItem, AbstractFormComponent } from '../../abstracts/abstract-form/abstract-form.directive';
import { FormInputComponent } from '../../abstracts/abstract-form/form-input.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/http/user/user.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @ViewChild(AbstractFormDirective, { static: true }) abstractForm: AbstractFormDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, public userService: UserService) { }

  user: IUser = { email: 'gilmar@teste.com', password: '12345678' }
  formUser: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  createFormGroup(user: IUser) {
    this.formUser = new FormGroup({
      email: new FormControl(user.email, [Validators.required, Validators.email, Validators.maxLength(20)]),
      password: new FormControl(user.password, [Validators.required])
    })
  }

  createForm() {
    this.createFormGroup(this.user)
    const emailItem = new AbstractFormItem(FormInputComponent, { title: "Email", name: 'email', placeholder: "ex@example.com" })
    const passwordItem = new AbstractFormItem(FormInputComponent, { title: "Senha", name: 'password', type: 'password' })
    this.abstractForm.createForm(this.componentFactoryResolver, this.formUser, [emailItem, passwordItem]);
  }

  login() {
    sessionStorage.clear()
    var formValue: IUser = this.formUser.value
    this.userService.auth(formValue.email, formValue.password, 'home')
  }
}
