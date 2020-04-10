import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { wsHost } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router'
import { IUser } from 'src/app/models/user.model';
import { AbstractWebService } from '../web.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractWebService<IUser> {

  constructor(private route: ActivatedRoute, private router: Router, public http: HttpClient) { super(http, wsHost.user) }

  auth(email: string, password: string, redirect: string) {
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', email);
    formData.append('password', password);
    return this.http.post<{ access_token: string }>(wsHost.auth, formData, { headers: { 'Authorization': 'Basic Y2xpZW50OjEyMw==' } })
      .subscribe(
        res => {
          sessionStorage.setItem(this.role + '_token', res.access_token);
          sessionStorage.setItem('user_email', email);
          console.log(res)
          this.router.navigate([redirect]);
        },
        err => {
          alert("Erro na autenticação")
          console.log(err.message);
        }
      )

  }

}

