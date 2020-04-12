import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { UserModel, IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/http/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomainConverter } from 'src/app/models/domain';
import { FormModalComponent } from '../../abstracts/dialog/form-modal.component';
import { ConfirmDialogComponent } from '../../abstracts/dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { WsConstants } from '../../admin/constants';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: UserModel

  constructor(public breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar) { this.userService.role = WsConstants.ROLE_CLIENT; }

  ngOnInit() {
    this.getUser()
  }

  getUser() {
    this.userService.login(sessionStorage.getItem('user_email')).subscribe(res => {
      this.user = DomainConverter.fromDto<UserModel>(UserModel, res.data)
    },
      err => {
        alert("Erro na autenticação")
        this.router.navigate(['login']);
      }
    )
  }

  editar(user: UserModel) {
    const dialogRef = this.dialog.open(FormModalComponent, {
      width: '400px',
      data: {
        title: "Editar Perfil",
        formItens: user.getFormItens({ 'ws': this.userService, 'client': true }),
        formGroup: user.getFormGroup()
      }
    });
    dialogRef.afterClosed().subscribe(formModel => {
      if (formModel) {
        this.updateModel(formModel)
      }
    });
  }

  updateModel(model: IUser) {
    this.userService.update(model.id, model).subscribe(res => {
      this.openSnackBar("Usuario atualizado")
      this.user = DomainConverter.fromDto<UserModel>(UserModel, model)
    }, err => {
      this.openConfirmDialog("ERRO ao atualizar o Usuario", err + ", Deseja tentar Novamente?").subscribe(tryAgain => {
        if (tryAgain) {
          this.updateModel(model)
        }
      });
    })
  }

  openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, { duration: 4000, verticalPosition: 'top' });
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

  logout() {
    sessionStorage.clear()
    this.openSnackBar("Desconectado")
    this.router.navigate(['login']);
  }
}
