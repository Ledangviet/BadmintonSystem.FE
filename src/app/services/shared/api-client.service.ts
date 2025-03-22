import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  baseUrl = environment.apiUrl;
  public get header(){
    let token = localStorage.getItem("accessToken")?.toString();
    return new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'tenant': '200325_KJJ2ASOJ'
    });
  }

  constructor(
    private httpClient: HttpClient
  ) { }
  /**Get request */
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + url,{headers : this.header});
  }

  /**Post request */
  post<T>(url: string, body : any): Observable<T>{
    return this.httpClient.post<T>(this.baseUrl + url,body,{headers : this.header});
  }

  /**Put request */
  put<T>(url: string, body : any): Observable<T>{
    return this.httpClient.put<T>(this.baseUrl + url,body,{headers : this.header});
  }

  /**Delete request */
  delete<T>(url: string, body : any): Observable<T>{
    return this.httpClient.delete<T>(this.baseUrl + url,{headers : this.header,body: body});
  }



    /**Get request */
  getNoHeader<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(this.baseUrl + url);
  }

  /**Post request */
  postNoHeader<T>(url: string, body : any): Observable<T>{
    return this.httpClient.post<T>(this.baseUrl + url,body);
  }

  /**Put request */
  putNoHeader<T>(url: string, body : any): Observable<T>{
    return this.httpClient.put<T>(this.baseUrl + url,body);
  }

  /**Delete request */
  deleteNoHeader<T>(url: string, body : any): Observable<T>{
    return this.httpClient.delete<T>(this.baseUrl + url,{body: body});
  }
}
