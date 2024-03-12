import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from './response-model.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public getData(): Observable<ResponseModel> {
    return this.http.get<ResponseModel>('./assets/data.json');
  }
}
