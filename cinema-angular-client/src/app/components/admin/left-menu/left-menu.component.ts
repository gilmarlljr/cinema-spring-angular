import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { UserModel, IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/http/user/user.service';
import { Router } from '@angular/router';
import { FormModalComponent } from '../../abstracts/dialog/form-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DomainConverter } from 'src/app/models/domain';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../abstracts/dialog/confirm-dialog.component';
import { SidenavService } from '../admin-nav/admin-nav.component';
import { Subject } from 'rxjs';
import { FormModelParms } from 'src/app/models/model';
import { WsConstants } from '../constants';





@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {

  public sideNavState: boolean = false;
  public linkText: boolean = false;
  user: UserModel
  selectedMenu: any
  constructor(private _sidenavService: SidenavService,
    public changeDetectorRefs: ChangeDetectorRef,
    private userService: UserService,
    private selectMenuService: SelectMenuService,
    public dialog: MatDialog,
    public router: Router, public snackBar: MatSnackBar) {
    this.userService.role = WsConstants.ROLE_ADMIN;
    this.selectMenuService.selectedMenu$.subscribe(data => {
      this.selectedMenu = { user: false, movie: false, report: false, session: false, room: false }
      this.selectedMenu[data] = true
      this.changeDetectorRefs.detectChanges();
    })

  }

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
        formItens: user.getFormItens({ 'ws': this.userService }),
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


  onSinenavToggle() {
    this.sideNavState = !this.sideNavState

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200)
    this._sidenavService.sideNavState$.next(this.sideNavState)
  }

}


@Injectable()
export class SelectMenuService {
  constructor() { }

  private emitChangeSource = new Subject<string>();

  selectedMenu$ = this.emitChangeSource.asObservable();

  emitChange(menu: string) {
    this.emitChangeSource.next(menu);
  }
}
