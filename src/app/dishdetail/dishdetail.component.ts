import { Component, OnInit } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService} from '../services/dish.service';

import { switchMap } from 'rxjs/operators';

import {Dish} from '../shared/dish';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  
  
    dish: Dish;
    dishIds: number[];
    prev: number;
    next: number;

    constructor(private dishService: DishService, 
      private route: ActivatedRoute,
      private location: Location) { }

  ngOnInit() {
    this.dishService.getDishId()
      .subscribe(dishIds => this.dishIds = dishIds);

    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(+params['id'])))
      .subscribe(dish => {
        this.dish = dish
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: number) 
  {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length]; // The parameter is just a way of wrapping around the array items in a mathematical trick
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length]; // The parameter is just a way of wrapping around the array items in a mathematical trick

  }

  goBack(): void {
    this.location.back();
  }

}
