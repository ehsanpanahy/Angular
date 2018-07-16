import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public extractData(res: Response) {
    let body = res.json();

    return body || { };
  }
}
