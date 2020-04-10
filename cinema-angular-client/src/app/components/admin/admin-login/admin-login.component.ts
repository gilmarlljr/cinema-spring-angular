import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AbstractFormDirective, AbstractFormItem } from '../../abstracts/abstract-form/abstract-form.directive';
import { UserService } from 'src/app/services/http/user/user.service';
import { FormInputComponent } from '../../abstracts/abstract-form/form-input.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserModel, IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  @ViewChild(AbstractFormDirective, { static: true }) abstractForm: AbstractFormDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private userService: UserService) { this.userService.role = 'admin' }

  user: IUser = { email: "admin@admin", password: "admin" }
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
    var formValue: IUser = this.formUser.value
    this.userService.auth(formValue.email, formValue.password, 'dashboard')
  }
}
