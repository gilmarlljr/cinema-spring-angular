import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { AbstractFormDirective, AbstractFormItem, AbstractFormComponent } from '../../abstracts/abstract-form/abstract-form.directive';
import { FormInputComponent } from '../../abstracts/abstract-form/form-input.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/http/user/user.service';
import { IUser } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../abstracts/dialog/confirm-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(AbstractFormDirective, { static: true }) abstractForm: AbstractFormDirective;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
     public userService: UserService,
     public router: Router,
     public dialog: MatDialog,
     public snackBar: MatSnackBar) { }

  user: IUser = {}
  formUser: FormGroup;
  ngOnInit() {
    this.createForm();
  }

  createFormGroup(user: IUser) {
    this.formUser = new FormGroup({
      email: new FormControl(user.email, [Validators.required, Validators.email, Validators.maxLength(300)]),
      password: new FormControl(user.password, [Validators.required, Validators.minLength(8)]),
      name: new FormControl(user.name, [Validators.required, Validators.maxLength(300)]),
    })
  }

  createForm() {
    this.createFormGroup(this.user)
    let email = new AbstractFormItem(FormInputComponent, { title: "Email", name: "email", placeholder: "ex@example.com", ws: this.userService })
    const password = new AbstractFormItem(FormInputComponent, { title: "Senha", name: 'password', type: 'password' })
    const name = new AbstractFormItem(FormInputComponent, { title: "Nome", name: 'name' })
    this.abstractForm.createForm(this.componentFactoryResolver, this.formUser, [name, email, password]);
  }

  register() {
    this.registerUser(this.formUser.value);
  }

  registerUser(model: IUser) {
    this.userService.register(model).subscribe(res => {
      this.openSnackBar("Usuario registrado")
      this.router.navigate(['login']);
    }, err => {
      this.openConfirmDialog("ERRO ao registrar o Usuario", err + ", Deseja tentar Novamente?").subscribe(tryAgain => {
        if (tryAgain) {
          this.registerUser(model)
        }
      });
    }
    )
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 8000, verticalPosition: 'top' });
  }

  openConfirmDialog(title: string, content: string): any {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title,
        content
      }
    });

    return dialogRef.afterClosed()
  }

}
