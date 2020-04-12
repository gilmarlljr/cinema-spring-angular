import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { wsHost } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router'
import { IUser } from 'src/app/models/user.model';
import { AbstractWebService } from '../web.service';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response.model';

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
                    this.router.navigate([redirect]);
        },
        err => {
          alert("Erro na autenticação")
          console.log(err.message);
        }
      )
  }

  check(params: { [param: string]: string }): Promise<any> {
    return this.http.get(this.url, { params: params }).toPromise();
  }

  register(model: IUser): Observable<ResponseModel<boolean>> {
    return this.http.post<ResponseModel<boolean>>(this.url + "/register", model);
  }

  login(email: string): Observable<ResponseModel<IUser>> {
    let user: IUser = { email }
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.post<ResponseModel<IUser>>(this.url + "/login", user, { headers: { 'Authorization': 'Bearer ' + token } });
  }

}

