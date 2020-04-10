import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cinema-angular-client'

  constructor() { }

  ngOnInit() {

  }
}

