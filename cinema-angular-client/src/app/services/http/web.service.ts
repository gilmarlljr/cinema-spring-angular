import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response.model';
import { HttpClient } from '@angular/common/http';
import { IModel } from 'src/app/models/model';

export abstract class AbstractWebService<I extends IModel> {
  constructor(public http: HttpClient, public url: string) { }
  role: string = 'client';
  getAll(): Observable<ResponseModel<I[]>> {
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.get<ResponseModel<I[]>>(this.url + "/all", { headers: { 'Authorization': 'Bearer ' + token } });
  }

  get(id: string): Observable<ResponseModel<I>> {
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.get<ResponseModel<I>>(this.url + "/" + id, { headers: { 'Authorization': 'Bearer ' + token } });
  }
  insert(model: I): Observable<ResponseModel<I>> {
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.post<ResponseModel<I>>(this.url, model, { headers: { 'Authorization': 'Bearer ' + token } });
  }

  update(id: string, model: I): Observable<ResponseModel<I>> {
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.put<ResponseModel<I>>(this.url + "/" + id, model, { headers: { 'Authorization': 'Bearer ' + token } });
  }

  delete(id: string): Observable<ResponseModel<number>> {
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.delete<ResponseModel<number>>(this.url + "/" + id, { headers: { 'Authorization': 'Bearer ' + token } });
  }
}
