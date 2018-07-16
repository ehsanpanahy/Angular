import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ProcessHTTPMsgService } from './process-httpmsg.service'

import { Dish } from '../shared/dish';



import { baseURL } from '../shared/baseurl';
import { } from './process-httpmsg.service';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http: HttpClient,
    private proccessHTTPService: ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]>  {
    return this.http.get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.proccessHTTPService.handleError));
  }

  getDish(id: number): Observable<Dish> {
   
   return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.proccessHTTPService.handleError));   
      
    
  }

  getFeaturedDish() : Observable<Dish>
  {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true')
      .pipe(map(dishes => dishes[0]))
      .pipe(catchError(this.proccessHTTPService.handleError));
  }

  getDishId(): Observable<number[] | any> {
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
      .pipe(catchError(error => error));
  }
}