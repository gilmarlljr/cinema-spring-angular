import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CardInterface } from '../in-theaters/in-theaters.component';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class CheckoutComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
   card: CardInterface = {
    imgSrc: 'https://ptanime.com/wp-content/uploads/2015/02/Attack-on-Titan-Filme-Poster.jpg',
    title: 'Singeki no kyojin',
    description:
      'Angular Flex Layout provides a sophisticated layout API using FlexBox CSS + mediaQuery.\
      This module provides Angular developers with component layout features using a custom Layout API, \
      mediaQuery observables, and injected DOM flexbox-2016 css stylings.'
  }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
  }
}
