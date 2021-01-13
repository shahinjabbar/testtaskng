import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { prop } from 'src/environments/properties';

@Injectable({
  providedIn: 'root'
})


export class HttpsService {


  headers = new HttpHeaders().set('Content-type', 'text/plain');
  // tslint:disable-next-line: variable-name
  post_headers = new HttpHeaders().set('Content-type', 'text/plain');
  public currentUser = localStorage.getItem('token');
  constructor() { }

  public rootUrl: string = 'http://' + prop.host;

  get(http: HttpClient, resourceUrl: string, params: any = {}): Observable<any> {
    return http.get<Response>(this.rootUrl + '/' + resourceUrl, {
      // tslint:disable-next-line: object-literal-shorthand
      params: params,
    });
  }

  post(http: HttpClient, resourceUrl: string, item: any, params: any = {}): Observable<any> {
    return http.post<Response>(this.rootUrl + '/' + resourceUrl, item, {
      // tslint:disable-next-line: object-literal-shorthand
      params: params,
    });
  }


  put(http: HttpClient, resourceUrl: string, item: any, params: any = {}): Observable<any> {
    return http.put<Response>(this.rootUrl + '/' + resourceUrl, item, {
      // tslint:disable-next-line: object-literal-shorthand
      params: params,
    });
  }

  delete(http: HttpClient, resourceUrl: string, params: any = {}): Observable<any> {
    return http.delete<Response>(this.rootUrl + '/' + resourceUrl, {
      // tslint:disable-next-line: object-literal-shorthand
      params: params,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteBody(http: HttpClient, resourceUrl: string, item: any = {}) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: item
    };
    return http.delete<Response>(this.rootUrl + '/' + resourceUrl, options);

  }


}
