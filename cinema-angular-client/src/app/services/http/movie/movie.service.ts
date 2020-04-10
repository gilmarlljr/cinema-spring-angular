import { Injectable } from '@angular/core';
import { AbstractWebService } from '../web.service';
import { IMovie } from 'src/app/models/movie.model';
import { HttpClient } from '@angular/common/http';
import { wsHost } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends AbstractWebService<IMovie> {

  constructor(public http: HttpClient) { super(http, wsHost.movie) }

}
