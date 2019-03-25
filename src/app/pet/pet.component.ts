import { Component, OnInit } from '@angular/core';
import { PetService } from './../core/services/pet.service';
import _ from 'lodash';

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss'],
})
export class PetComponent implements OnInit {

  public cats: any;

  constructor(public petService: PetService) {

  }

  ngOnInit() {
    this.petService.getData()
    .subscribe((data: any) => {
      this.cats = this.extractCats(data);
    });
  }

  extractCats(data) {
    if (typeof data === 'undefined' || !data) return;
      return _(data)
            .filter(y => y.pets !== null ) 
            .groupBy(x => x.gender)
            .map((item, key) => {
              return {
                key,
                value: item.flatMap(i => i.pets).filter(pet => pet.type === 'Cat')
              }
            }).reduce((obj, item) => (obj[item.key.toLowerCase()] = item.value, obj) ,{});
  }

  ngOnDestroy() {

  }
}

