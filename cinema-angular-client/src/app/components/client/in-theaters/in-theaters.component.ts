import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-in-theaters',
  templateUrl: './in-theaters.component.html',
  styleUrls: ['./in-theaters.component.css']
})
export class InTheatersComponent implements OnInit {
  public cardList: CardInterface[] = [];
  ngOnInit() {
    for (let i = 1; i <= 10; i++) {
      this.cardList.push({
        imgSrc: 'https://ptanime.com/wp-content/uploads/2015/02/Attack-on-Titan-Filme-Poster.jpg',
        title: 'Card No. ' + i,
        description:
          'Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery.\
          This module provides Angular developers with component layout features using a custom Layout API, \
          mediaQuery observables, and injected DOM flexbox-2016 css stylings.'
      });
    }
  }
}

export interface CardInterface {
  imgSrc: string;
  title: string;
  description: string;
}

