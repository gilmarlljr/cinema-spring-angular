import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cinema-angular-client'
  public cardList: CardInterface[] = [];
  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.cardList.push({
        imgSrc: 'http://via.placeholder.com/300',
        title: 'Card No. ' + i,
        description:
          'Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery.\
          This module provides Angular developers with component layout features using a custom Layout API, \
          mediaQuery observables, and injected DOM flexbox-2016 css stylings.'
      });
    }
    this.breakpointObserver
      .observe(['(min-width: 380px)', '(min-width: 740px)','(min-width: 1280px)'])
      .subscribe((state: BreakpointState) => {
        if (this.breakpointObserver.isMatched('(min-width: 1280px)')) {
          console.log('1280');
        } else if (this.breakpointObserver.isMatched('(min-width: 740px)')) {
          console.log('740');
        } else if (this.breakpointObserver.isMatched('(min-width: 380px)')) {
          console.log('380');
        }
      });
  }
}
export interface CardInterface {
  imgSrc: string;
  title: string;
  description: string;
}
