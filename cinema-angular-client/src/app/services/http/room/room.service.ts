import { Injectable } from '@angular/core';
import { IRoom } from 'src/app/models/room.model';
import { AbstractWebService } from '../web.service';
import { HttpClient } from '@angular/common/http';
import { wsHost } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends AbstractWebService<IRoom> {

  constructor(public http: HttpClient) { super(http, wsHost.room) }

}
