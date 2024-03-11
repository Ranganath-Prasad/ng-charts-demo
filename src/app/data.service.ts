import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudCost } from './cloud-cost.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public getCloudCosts(): Observable<CloudCost[]> {
    return this.http.get<CloudCost[]>('./assets/test-data.json');
  }
}
