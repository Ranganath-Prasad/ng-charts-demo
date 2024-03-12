import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from './response-model.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public getData(
    drillDownLevel: string,
    value: string
  ): Observable<ResponseModel> {
    if (drillDownLevel == 'month')
      return this.http.get<ResponseModel>('./assets/data-month-wise.json');
    else {
      let dateArr = value.split('/');
      return this.http.get<ResponseModel>(
        `./assets/data-day-wise-${dateArr[1]}.json`
      );
    }
  }
}
