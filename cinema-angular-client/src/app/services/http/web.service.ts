import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/response.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IModel } from 'src/app/models/model';
import { WsConstants } from 'src/app/components/admin/constants';
export abstract class AbstractWebService<I extends IModel> {
  constructor(public http: HttpClient, public url: string) { }
  role: string = WsConstants.ROLE_CLIENT;
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

  check(params: { [param: string]: string }): Promise<any> {
    let token = sessionStorage.getItem(this.role + '_token');
    return this.http.get(this.url, { headers: { 'Authorization': 'Bearer ' + token }, params: params }).toPromise();
  }

}
