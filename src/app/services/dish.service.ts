import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Dish } from '../shared/dish';



import { baseURL } from '../shared/baseurl';
import { } from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http: HttpClient) { }

  getDishes(): Observable<Dish[]>  {
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: number): Observable<Dish> {
   
   return this.http.get<Dish>(baseURL + 'dishes/' + id);   
      
    
  }

  getFeaturedDish() : Observable<Dish>
  {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]));
  }

  getDishId(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}