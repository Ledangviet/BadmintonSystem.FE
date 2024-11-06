import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiclientService {
  private apiUrl = `${environment.baseEndPoint}${environment.apiVersion}`;
  public token = "";
  constructor(
    private http: HttpClient
  ) { }

  addGender(genderName : string ) : Observable<any>{
    return this.http.post(`${this.apiUrl}/genders`,{data: {name: genderName}});
  }
}
