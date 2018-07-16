import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Restangular} from 'ngx-restangular';

import { ProcessHTTPMsgService } from './process-httpmsg.service'

import { Dish } from '../shared/dish';



import { baseURL } from '../shared/baseurl';
import { } from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private restangular: Restangular,
    private proccessHTTPService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]>  {
    return this.restangular.all('dishes').getList();
      
  }

  getDish(id: number): Observable<Dish> {
   
   return this.restangular.one('dishes', id).get();   
      
    
  }

  getFeaturedDish() : Observable<Dish>
  {
    return this.restangular.all('dishes').getList({feature: true})
      .pipe(map(dishes => dishes[0]));
  }

  getDishId(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
}