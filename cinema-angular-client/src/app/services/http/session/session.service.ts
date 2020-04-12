import { Injectable } from '@angular/core';
import { AbstractWebService } from '../web.service';
import { HttpClient } from '@angular/common/http';
import { wsHost } from 'src/environments/environment';
import { ISession } from 'src/app/models/session.model';
import { IMovieSession } from 'src/app/models/movie-session.model';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends AbstractWebService<ISession> {

  constructor(public http: HttpClient) { super(http, wsHost.session) }

  getMovieSession(): Observable<ResponseModel<IMovieSession[]>> {
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.get<ResponseModel<IMovieSession[]>>(this.url + "/movies", { headers: { 'Authorization': 'Bearer ' + token } });
  }

}

