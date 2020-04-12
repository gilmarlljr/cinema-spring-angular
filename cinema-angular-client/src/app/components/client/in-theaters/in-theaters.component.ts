import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/http/session/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { ISession, IMovieSession } from 'src/app/models/session.model';
import { DomainConverter } from 'src/app/models/domain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-theaters',
  templateUrl: './in-theaters.component.html',
  styleUrls: ['./in-theaters.component.css']
})

export class InTheatersComponent {
  public cardList: CardInterface[] = [];
  constructor(public ws: SessionService,
    public router: Router, ) {
    this.listSessions()
  }

  sessions: IMovieSession[]



  listSessions() {
    this.ws.getMovieSession().subscribe(res => {
      this.sessions = res.data
    })
  }
}

export interface CardInterface {
  imgSrc: string;
  title: string;
  description: string;
}

